const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const render = require("./src/page-template");
// Pull in All team one by one ,
const team = [];
const teamIds = [];
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const { finished } = require("stream");

if (!team.length) {
  createTeammate();
}
// use inquirere prompts to build objects
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name ?",
        name: "name",
      },
      {
        type: "input",
        message: "whats the ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "Whats your email?",
        name: "email",
      },
      {
        type: "input",
        message: "whats your phonenumber?",
        name: "phone",
      },
    ])
    .then(function ({ name, id, email, phone }) {
      let newMember;
      newMember = new Manager(name, id, email, phone);
      team.push(newMember);
      createTeammate();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name ?",
        name: "name",
      },
      {
        type: "input",
        message: "whats the ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "Whats your email?",
        name: "email",
      },
      {
        type: "input",
        message: "whats your GitHub?",
        name: "github",
      },
    ])
    .then(function ({ name, id, email, github }) {
      let newMember;
      newMember = new Engineer(name, id, email, github);
      team.push(newMember);
      createTeammate();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name ?",
        name: "name",
      },
      {
        type: "input",
        message: "whats the ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "Whats your email?",
        name: "email",
      },
      {
        type: "input",
        message: "whats your school?",
        name: "school",
      },
    ])
    .then(function ({ name, id, email, school }) {
      let newMember;
      newMember = new Intern(name, id, email, school);
      team.push(newMember);
      createTeammate();
    });
}
function createTeammate() {
  console.log("team so far in createTeam", team);
  inquirer
    .prompt([
      {
        type: "list",
        message: "Add a team member?",
        choices: [
          "Engineer",
          "Intern",
          "Manager",
          "I don't want to add another team member.",
        ],
        name: "member",
      },
    ])
    .then(function ({ member }) {
      switch (member) {
        case "Engineer":
          createEngineer();
          break;

        case "Intern":
          createIntern();
          break;

        case "Manager":
          createManager();
          break;

        default:
          buildTeam();
          break;
      }
    });
}
function buildTeam() {
  // Create the output directory if the output path doesn't exist
  fs.writeFileSync("index.html", render(team), "utf-8");
  console.log("Team built!");
}
