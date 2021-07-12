import inquirer from "Inquirer";
import path from "path";
import { Manager, Engineer, Intern } from "./utils/classes.js";

const empTypeList = {
	type: "list",
	name: "license",
	message: "What is the license for your project?",
	choices: ["MIT", "BSD-2", "None"],
},

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

const teamMembers = [];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((data) => {
        writeToFile("README.md", generate({ ...data }));
    });
}

// Function call to initialize app
init();