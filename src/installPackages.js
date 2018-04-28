"use strict";

const installFromQuestions = require("./utils/installFromQuestions");

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