const inquirer = require("Inquirer");
const path = require("path");

// import inquirer from "Inquirer";
// import path from "path";

// const routes = require("./routes.js");

const Manager = require("./utils/manager");
const Engineer = require("./utils/engineer");
const Intern = require("./utils/intern");

// import Manager from "./utils/manager.js";
// import Engineer from "./utils/engineer";
// import Intern from "./utils/intern";

let done = false;

const empTypeList = [
    {
        type: "list",
        name: "empType",
        message:
            "Would you like to enter an engineer, intern, or finish your entries?",
        choices: ["Engineer", "Intern", "Finished"],
    },
];

const questions = {
    manager: [
        {
            type: "input",
            name: "mgrName",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "mgrEmpId",
            message: "What is the team manager's employee ID?",
        },
        {
            type: "input",
            name: "mgrEmail",
            message: "What is the team manager's email?",
        },
        {
            type: "input",
            name: "mgrOfficeNum",
            message: "What is the team manager's office number?",
        },
    ],
    engineer: [
        {
            type: "input",
            name: "engName",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "engEmpId",
            message: "What is the engineer's ID?",
        },
        {
            type: "input",
            name: "engEmail",
            message: "What is the engineer's email?",
        },
        {
            type: "input",
            name: "engGithub",
            message: "What is the engineer's github?",
        },
    ],
    intern: [
        {
            type: "input",
            name: "IntName",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "IntEmpId",
            message: "What is the intern's employee ID?",
        },
        {
            type: "input",
            name: "IntEmail",
            message: "What is the intern's email?",
        },
        {
            type: "input",
            name: "intSchool",
            message: "Where does the intern attend school?",
        },
    ],
};

let teamMembers = [];

// Function to initialize app
async function init() {
    await teamMgr();
    let nextEmp = await inquirer.prompt(empTypeList);
    console.log(nextEmp);
    if (nextEmp.empType === "Engineer") {
        teamEng();
    } else if (nextEmp.empType === "Intern") {
        teamInt();
    } else if (nextEmp.empType === "Finished") {
        // function generateHTML
    }
    // inquirer.prompt(empTypeList).then((data) => {
    //     if (data.empType === "Engineer") {
    //         teamEng();
    //     } else if (data.empType === "Intern") {
    //         teamInt();
    //     } else if (data.empType === "Finished") {
    //         // function generateHTML
    //     }
    // });
}

async function teamMgr() {
    let teamMembers = await inquirer.prompt(questions.manager);
    return teamMembers;
}

async function teamEng() {
    let teamMembers = await inquirer.prompt(questions.engineer);
    return teamMembers;
}

async function teamInt() {
    let teamMembers = await inquirer.prompt(questions.intern);
    return teamMembers;
}

// Function call to initialize app
init();
