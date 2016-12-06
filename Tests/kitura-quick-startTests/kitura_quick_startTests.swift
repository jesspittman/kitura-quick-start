import XCTest
@testable import kitura_quick_start

class kitura_quick_startTests: XCTestCase {
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
        XCTAssertEqual(kitura_quick_start().text, "Hello, World!")
    }


    static var allTests : [(String, (kitura_quick_startTests) -> () throws -> Void)] {
        return [
            ("testExample", testExample),
        ]
    }
}
