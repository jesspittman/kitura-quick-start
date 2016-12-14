import Foundation
import Kitura
import SwiftyJSON
import MongoKitten

class AppRouter {
    public let router = Router()
    public var repairs: Repairs
    
    init() {
        repairs = Repairs()        
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
            if let doc = self.repairs.getRepairs() {
                try response.send("\(doc)").end()
            } else {
                try response.status(.internalServerError).end()
            }
        }
        router.post("/api/repairs") { request, response, next in
            if let json = request.body?.asJSON?.dictionaryObject {
                let success = self.repairs.insertRepair(json)
                try response.status(success ? .OK : .internalServerError).end()
            } else {
                try response.status(.internalServerError).end()
            }
        }
        router.put("/api/repairs/:serial") { request, response, next in
            if let json = request.body?.asJSON?.dictionaryObject, let serial = request.parameters["serial"] {
                let success = self.repairs.updateRepair(json, serial: serial)
                try response.status(success ? .OK : .internalServerError).end()
            } else {
                try response.status(.internalServerError).end()
            }
        }
    }
}
