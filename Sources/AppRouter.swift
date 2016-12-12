import Foundation
import Kitura
import SwiftyJSON
import MongoKitten

class AppRouter {
    public let router = Router()
    
    init() {
        setupRoutes()
    }
    
    func setupRoutes() {
        router.all("/*", middleware: BodyParser())
        router.all("/(^(?!api).*$)", middleware: StaticFileServer())
        router.get("/api/hello/:world?") { request, response, next in
            let world = request.parameters["world"] ?? "World"
            try response.send("Hello \(world)").end()
        }
        router.get("/api/repairs") { request, response, next in 
            let database = try Database(mongoURL: "mongodb://localhost/repairShop")
            let repairsCollection = database["repairs"]
            let repairs = JSON(Array(try repairsCollection.find()))
            try response.send(json: repairs).end()
        }
        router.post("/api/repairs") { request, response, next in
            let document: Document = ["serial": "100001-13A"]
            let database = try Database(mongoURL: "mongodb://localhost/repairShop")
            let repairsCollection = database["repairs"]
            try repairsCollection.insert(document)
            try response.status(.OK).send("").end();
        }
        router.put("/api/repairs/:serial") { request, response, next in
            let document: Document = ["serial": request.parameters["serial"]!]
            let database = try Database(mongoURL: "mongodb://localhost/repairShop")
            let repairsCollection = database["repairs"]
            try repairsCollection.update(matching: "serial" == request.parameters["serial"]!, to: document)
            try response.send("").end();
        }
    }
}
