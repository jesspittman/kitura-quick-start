import PackageDescription

let package = Package(
    name: "kitura-quick-start",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura", majorVersion: 1),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger", majorVersion: 1),
        .Package(url: "https://github.com/OpenKitten/MongoKitten.git", "3.0.0-beta"),
		.Package(url: "https://github.com/IBM-Swift/Swift-cfenv.git", majorVersion: 1)
    ]
)
