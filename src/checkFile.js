'use strict'

const fs = require("fs");
const extractPackagesToInstall = require("./utils/extractPackagesToInstall");

// Checks a file before deciding weither to install or display
let checkFile = function(cb) {
    fs.readFile(process.cwd() + "/package.json", "utf8", (err, file2) => {
        if (err) {
            console.log(
                "\nIt seems like the file was not found. Stop messing with me please :-)\n\n",
                err
            );
        } else {
            let installed = JSON.parse(file2).dependencies || {};
            let main = JSON.parse(file2).main || "";

            if (installed && main) {
                let path = process.cwd() + "/" + main;

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
            }
        }
    });
};

module.exports = checkFile;