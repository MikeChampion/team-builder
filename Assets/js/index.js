const inquirer = require("Inquirer");
const path = require("path");
const fs = require("fs");

const Manager = require("./utils/manager");
const Engineer = require("./utils/engineer");
const Intern = require("./utils/intern");

const PORT = 8080;
let teamMembers = [];
let finished = false;

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
            name: "name",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's employee ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email?",
        },
        {
            type: "input",
            name: "officeNum",
            message: "What is the team manager's office number?",
        },
    ],
    engineer: [
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?",
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github?",
        },
    ],
    intern: [
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's employee ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?",
        },
        {
            type: "input",
            name: "school",
            message: "Where does the intern attend school?",
        },
    ],
};

// Function to initialize app
// Gathers info from CLI prompts, creates teamMembers array, renders HTML
async function init() {
    // ASKING QUESTIONS
    await teamMgr();
    while (finished === false) {
        let nextEmp = await inquirer.prompt(empTypeList);
        if (nextEmp.empType === "Engineer") {
            await teamEng();
        } else if (nextEmp.empType === "Intern") {
            await teamInt();
        } else if (nextEmp.empType === "Finished") {
            finished = true;
        }
    }

    // GENERATE TEAM TILES
    const generate = teamTilesGen(teamMembers);

    // GENERATE INDEX.HTML
    const finalPage = generateTeamHTML(generate);

    // WRITE FILE with fs
    fs.writeFile("team.html", finalPage, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File written successfully\n");
        }
    });
}

function teamTilesGen(teamMembers) {
    let teamTiles = "";
    teamMembers.forEach((member) => {
        let memTile = memberTileGen(member[0], member[1]);
        teamTiles = teamTiles + memTile;
    });
    return teamTiles;
}

function memberTileGen(type, member) {
    let tile;
    if (type === "manager") {
        tile = `<div
    class="
        tile
        flex flex-col
        w-full
        md:w-2/5
        lg:w-1/4 lg:flex-grow-0
        border border-r-4 border-b-4 border-blue-400
        rounded-md
    "
>
    <div class="tile-header bg-blue-400 flex flex-col gap-2">
        <p class="name pt-2 pl-4 font-bold text-xl">${member.name}</p>
        <p
            class="
                title
                pb-2
                pl-8
                font-bold
                text-lg
                flex flex-row
            "
        >
            <ion-icon
                name="cafe-outline"
                class="self-center pr-2"
            ></ion-icon>
            Manager
        </p>
    </div>

    <div class="tile-body bg-gray-200">
        <div
            class="
                info
                flex flex-col
                justify-center
                items-center
                gap-y-1
                py-4
            "
        >
            <p class="id w-11/12 px-4 py-2 bg-white">
                <ion-icon name="id-card-outline"></ion-icon> ${member.id}
            </p>
            <p class="email w-11/12 px-4 py-1 bg-white">
                <ion-icon name="mail-outline"></ion-icon>
                <a href="mailto:${member.email}"
                    >${member.email}</a
                >
            </p>
            <p class="office w-11/12 px-4 py-2 bg-white">
                <ion-icon name="location-outline"></ion-icon>
                ${member.officeNum}
            </p>
        </div>
    </div></div>`;
    } else if (type === "engineer") {
        tile = `<div
        class="
            tile
            flex flex-col
            w-full
            md:w-2/5
            lg:w-1/4 lg:flex-grow-0
            border border-r-4 border-b-4 border-blue-400
            rounded-md
        "
    >
        <div class="tile-header bg-blue-400 flex flex-col gap-2">
            <p class="name pt-2 pl-4 font-bold text-xl">${member.name}</p>
            <p class="title pb-2 pl-8 font-bold text-lg">
                <ion-icon name="code-outline"></ion-icon> Engineer
            </p>
        </div>
        <div class="tile-body bg-gray-200">
            <div
                class="
                    info
                    flex flex-col
                    justify-center
                    items-center
                    gap-y-1
                    py-4
                "
            >
                <p class="id w-11/12 px-4 py-2 bg-white">
                    <ion-icon
                        name="id-card-outline"
                        class="self-center pr-2"
                    ></ion-icon>
                    ${member.id}
                </p>
                <p class="email w-11/12 px-4 py-1 bg-white">
                    <ion-icon name="mail-outline"></ion-icon>

                    <a href="mailto:${member.email}"
                        >${member.email}</a
                    >
                </p>
                <p class="office w-11/12 px-4 py-2 bg-white">
                    <ion-icon name="logo-github"></ion-icon>

                    ${member.github}
                </p>
            </div>
        </div>
    </div>`;
    } else if (type === "intern") {
        tile = `<div
        class="
            tile
            flex flex-col
            w-full
            md:w-2/5
            lg:w-1/4 lg:flex-grow-0
            border border-r-4 border-b-4 border-blue-400
            rounded-md
        "
    >
        <div class="tile-header bg-blue-400 flex flex-col gap-2">
            <p class="name pt-2 pl-4 font-bold text-xl">${member.name}</p>
            <p class="title pb-2 pl-8 font-bold text-lg">
                <ion-icon
                    name="person-add-outline"
                    class="self-center pr-2"
                ></ion-icon>
                Intern
            </p>
        </div>
        <div class="tile-body bg-gray-200">
            <div
                class="
                    info
                    flex flex-col
                    justify-center
                    items-center
                    gap-y-1
                    py-4
                "
            >
                <p class="id w-11/12 px-4 py-2 bg-white">
                    <ion-icon name="id-card-outline"></ion-icon>
                    ${member.id}
                </p>
                <p class="email w-11/12 px-4 py-1 bg-white">
                    <ion-icon name="mail-outline"></ion-icon>
                    <a href="mailto:${member.email}"
                        >${member.email}</a
                    >
                </p>
                <p class="office w-11/12 px-4 py-2 bg-white">
                    <ion-icon name="school-outline"></ion-icon>
                    ${member.school}
                </p>
            </div>
        </div>
    </div></div>`;
    }
    return tile;
}

function generateTeamHTML(teamTiles) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
                href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <script
                type="module"
                src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
            ></script>
            <script
                nomodule
                src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
            ></script>
            <link rel="stylesheet" type="text/css" href="./assets/css/style.css" />
            <title>My Team</title>
        </head>
        <body class="flex flex-col justify-center items-center w-full">
            <header class="flex flex-col w-full bg-indigo-700 text-gray-200">
                <!-- <nav></nav> -->
                <h1 class="text-center py-8 font-bold text-4xl">My Team</h1>
            </header>
            <main class="flex flex-col justify-center items-center w-full">
                <div
                    class="
                        tile-container
                        flex
                        md:flex-wrap
                        flex-col
                        md:flex-row
                        justify-center
                        items-center
                        w-11/12
                        md:w-full
                        pt-12
                        gap-4
                        md:gap-2
                        lg:gap-4
                    "
                >${teamTiles}
    </div>
                </main>
                <footer></footer>
                <script src="./assets/js/main.js"></script>
            </body>
        </html>`;
}

async function teamMgr() {
    let member = ["manager"];
    let newMember = await inquirer.prompt(questions.manager);
    member.push(newMember);
    return teamMembers.push(member);
}

async function teamEng() {
    let member = ["engineer"];
    let newMember = await inquirer.prompt(questions.engineer);
    member.push(newMember);
    return teamMembers.push(member);
}

async function teamInt() {
    let member = ["intern"];
    let newMember = await inquirer.prompt(questions.intern);
    member.push(newMember);
    return teamMembers.push(member);
}

// Function call to initialize app
init();
