import Foundation
import Kitura
import SwiftyJSON
import HeliumLogger
import CloudFoundryEnv

func getCredentials(_ serviceName: String) -> [String: Any?]? {
    do {
        let appEnv = try CloudFoundryEnv.getAppEnv()
        if let service = appEnv.getService(spec: serviceName) {
            return service.credentials?.dictionaryObject
        }
    } catch {
        print("Failed to get Cloud Foundry app environment")
    }
    return nil
}

let appRouter = AppRouter()
HeliumLogger.use(.info)

let creds = getCredentials("tester_service")
    
Kitura.addHTTPServer(onPort: 8090, with: appRouter.router)
Kitura.run()