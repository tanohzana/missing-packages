'use strict'

const fs = require("fs");
const extractPackagesToInstall = require("./utils/extractPackagesToInstall");

// Checks a file before deciding weither to install or display
let checkFile = (cb, ...paramsForTests) => {

    let path = (paramsForTests.length > 0) ? paramsForTests[0] : process.cwd() + "/package.json";

    fs.readFile(path, "utf8", (err, file2) => {
        if (err) {
            console.log(
                "\nIt seems like the file was not found. Stop messing with me please :-)\n\n",
                err
            );
        } else {
            let installed = JSON.parse(file2).dependencies || {};
            let main = JSON.parse(file2).main || "";

            if (installed && main) {
                let path = (paramsForTests.length > 0) ? paramsForTests[1] : process.cwd() + "/" + main;

                fs.readFile(path, "utf8", (err, file) => {
                    if (err) {
                        console.log(
                            "\nIt seems like the file was not found. Stop messing with me please :-)\n\n",
                            err
                        );
                    } else {
                        let packages = extractPackagesToInstall(file);
                        cb(packages, Object.keys(installed));
                    }
                });
            } else {
                console.log("No main file in package.json or installed packages");
            }
        }
    });
};

module.exports = checkFile;