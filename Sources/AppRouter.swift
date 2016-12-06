import Foundation
import Kitura
import SwiftyJSON

class AppRouter {
    public let router = Router()
    
    init() {
        setupRoutes()
    }
    
    func setupRoutes() {
        router.all("/*", middleware: BodyParser())
        router.get("/:world?") { request, response, next in
            let world = request.parameters["world"] ?? "World"
            try response.send("Hello \(world)").end()
        }
    }
}
