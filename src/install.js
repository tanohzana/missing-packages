'use strict'

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

// Prompts the user before installing missing packages
let installPackages = (packages, installed) => {
    let toInstallQuestions = [];

    packages.forEach(p => {
        if (!installed.includes(p)) {
            toInstallQuestions.push({
                type: "confirm",
                name: p,
                message: "Install package \x1b[32m" + p + "\x1b[0m ?",
                default: false
            });
        }
    });

    installFromQuestions(toInstallQuestions);
};

module.exports = installPackages;