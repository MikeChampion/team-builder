// import Employee from "../utils/employee";
const Employee = require("../utils/employee");

describe("init", () => {
    it("Should create an instance of Employee", () => {
        const name = "Mr. Testy McTest";
        const id = 42;
        const email = "generic@testing.com";
        const object = new Employee(name, id, email);
        expect(object).toBeInstanceOf(Employee);
    });
});
