import Foundation
import Kitura
import HeliumLogger

let appRouter = AppRouter()
HeliumLogger.use(.info)
    
Kitura.addHTTPServer(onPort: 8090, with: appRouter.router)
Kitura.run()
