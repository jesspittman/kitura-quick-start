import PackageDescription

let package = Package(
    name: "kitura-quick-start",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura", majorVersion: 1)
    ]
)
