// import Manager from "../utils/manager";
const Intern = require("../utils/intern");

describe("init", () => {
    it("Should create an instance of Intern", () => {
        const name = "Intern";
        const id = 3;
        const email = "intern@testing.com";
        const school = "Washington University";
        const object = new Intern(name, id, email, school);
        expect(object).toBeInstanceOf(Intern);
    });
});
