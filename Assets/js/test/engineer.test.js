// import Manager from "../utils/manager";
const Engineer = require("../utils/engineer");

describe("init", () => {
    it("Should create an instance of Engineer", () => {
        const name = "Engi Neer";
        const id = 2;
        const email = "engineer@testing.com";
        const github = "MyGithub";
        const object = new Engineer(name, id, email, github);
        expect(object).toBeInstanceOf(Engineer);
    });
});
