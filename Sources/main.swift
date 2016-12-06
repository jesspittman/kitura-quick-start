import Foundation
import Kitura

let appRouter = AppRouter()
    
Kitura.addHTTPServer(onPort: 8090, with: appRouter.router)
Kitura.run()
