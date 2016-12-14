import Foundation
import MongoKitten

class Repairs {
    private let mongourl: String
    private let collection: String
    private let projection: Projection

    init() {
        mongourl = "mongodb://localhost/repairShop"
        collection = "repairs"
        projection = [
            "_id": false,
            "serial": true,
            "display": true,
            "sound":true,
            "power": true,
            "connectors": true,
            "other": true,
            "comments": true,
            "status": true,
            "dateAdded": true,
            "lastModified": true
        ]
    }

    private func getCollection() throws -> MongoKitten.Collection { 
        let database = try Database(mongoURL: self.mongourl)
        return database[self.collection]
    }

    public func getRepairs() -> [Document]? {
        do {
            let repairsCollection = try getCollection()
            let repairs = Array(try repairsCollection.find(projecting: projection, limitedTo: 50))
            return repairs
        } catch {
            print("Failed to retrieve documents")
            return nil;
        }
    }

    public func insertRepair(_ repair: [String: Any]) -> Bool {
        do {
            let repairsCollection = try getCollection() 
            let document: Document = [ 
                "serial": repair["serial"] as! String,
                "display": repair["display"] as! Bool,
                "sound": repair["sound"] as! Bool,
                "power": repair["power"] as! Bool,
                "connectors": repair["connectors"] as! Bool,
                "other": repair["other"] as! Bool,
                "comments": repair["comments"] as! String,
                "status": repair["status"] as! String,
                "dateAdded": Date(),
                "lastModified": Date()
            ]       
            try repairsCollection.insert(document)
            return true
        } catch {
            return false
        }
    }

    public func updateRepair(_ repair: [String: Any], serial: String) -> Bool {
        do {
            let repairsCollection = try getCollection()
            let document: Document = [ 
                "$set": [
                    "serial": repair["serial"] as! String,
                    "display": repair["display"] as! Bool,
                    "sound": repair["sound"] as! Bool,
                    "power": repair["power"] as! Bool,
                    "connectors": repair["connectors"] as! Bool,
                    "other": repair["other"] as! Bool,
                    "comments": repair["comments"] as! String,
                    "status": repair["status"] as! String,
                    "lastModified": Date()
                ] as Document
            ]
            try repairsCollection.update(matching: "serial" == serial, to: document)
            return true
        } catch {
            return false
        }
    }
}