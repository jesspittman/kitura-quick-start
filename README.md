## Getting Started

To get up and running with a Swift + Kitura project simply clone this repository:  
`git clone https://github.com/jesspittman/kitura-quick-start.git`

and then change into the new directory and build it with:  
`swift build`

You can then run the built project with:  
`.build/debug/kitura-quick-start`

To generate a `.xcodeproj` file for opening this directory in Xcode, you will need this command:  
`swift package generate-xcodeproj`

## Included packages
[Kitura](http://www.kitura.io/) - A Swift web framework and HTTP server.  
[Swift-cfenv](https://github.com/IBM-Swift/Swift-cfenv) - Easy access to Cloud Foundry application 
environment for Swift Packages.   
[MiniPromiseKit](https://github.com/davidungar/miniPromiseKit) - A simplified promise library.  
[MongoKitten](https://github.com/OpenKitten/MongoKitten) - Native MongoDB driver for Swift

## Other great packages
[MiniPromiseKit](https://github.com/davidungar/miniPromiseKit) - A simplified promise library. 

### Adding a new package
Adding a new package to your project is simple. Just open up the Package.swift file and add a new line
to dependencies:
```
dependencies: [
    .Package(url: "https://github.com/IBM-Swift/Kitura", majorVersion: 1, minorVersion: 2),
    .Package(url: "https://github.com/IBM-Swift/HeliumLogger", "1.1.0",
    .Package(url: "https://github.com/OpenKitten/MongoKitten.git", majorVersion: 2),
    .Package(url: "https://github.com/IBM-Swift/Swift-cfenv.git", majorVersion: 1)
]
```  

* `url` is the URL to a git repository.
* `majorVersion` is the [major version](http://semver.org/) of a git release.  
* `minorVersion` is the minor version of the release. 



[Swift package manager documentation](https://swift.org/package-manager/)