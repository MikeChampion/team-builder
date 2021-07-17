const Manager = require("../utils/manager");

describe("init", () => {
    it("Should create an instance of Manager", () => {
        const name = "Mr. Manager";
        const id = 42;
        const email = "test@testing.com";
        const officeNumber = 1042;
        const object = new Manager(name, id, email, officeNumber);
        expect(object).toBeInstanceOf(Manager);
    });
});
