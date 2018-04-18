'use strict';

const fs = require("fs");
const getPackageJson = require("./utils/getPackageJson");
const extractPackagesToInstall = require("./utils/extractPackagesToInstall");

let packages = [];
let iterations = 0;
let gblPath = "";

// Checks all files in a directory
let checkDirectory = (path, recursive, cb) => {

    iterations++;

    if(iterations === 1) {
        gblPath = path;
    }

    try {
        if (fs.lstatSync(path).isDirectory()) {
            fs.readdirSync(path).forEach(file => {
                if (file.match(/\.js/g) && !file.match(/\.json/g)) {
                    let file2 = fs.readFileSync(path + "/" + file, "utf8");

                    let newPackages = extractPackagesToInstall(file2);

                    if (newPackages) {
                        newPackages.forEach(p => {
                            if (!packages.includes(p)) {
                                packages.push(p);
                            }
                        });
                    }
                } else if (
                    fs.lstatSync(path + "/" + file).isDirectory() &&
                    file !== "node_modules"
                ) {
                    if (recursive) {
                        checkDirectory(path + "/" + file, recursive, cb);
                    }
                }
            });

            if (path === gblPath) {
                getPackageJson("package.json", packages, 0, cb);
            }
        } else {
            fs.readFile(path, "utf8", (err, file) => {
                if (err) {
                    console.log(err);
                } else {
                    let packages = extractPackagesToInstall(file);
                    getPackageJson("package.json", packages, 0, cb);
                }
            });
        }
    } catch (e) {
        if (e.message.substr(0, 6) === "ENOENT") {
            console.log("No such file or directory");
        } else {
            console.log(e);
        }
    }
};

module.exports = checkDirectory;