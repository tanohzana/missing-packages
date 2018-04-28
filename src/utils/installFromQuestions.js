"use strict";

const inquirer = require("inquirer");
const shell = require("shelljs");

// Installs a single package
let installOnePackage = (uniquePackage) => {
    shell.exec("npm install --save " + uniquePackage);
};

let installFromQuestions = (toInstallQuestions) => {
    inquirer.prompt(toInstallQuestions).then(answers => {
        for (let p in answers) {
            if (answers[p]) {
                installOnePackage(p);
            }
        }
    });
};

module.exports = installFromQuestions;