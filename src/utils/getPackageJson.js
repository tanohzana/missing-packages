'use strict';

const fs = require("fs");

// Does everything it can to find a package.json, even in parent dirs
let getPackageJson = function(packagePath, packages, cpt, cb) {
    fs.readFile(process.cwd() + "/" + packagePath, "utf8", (err, file2) => {
        if (err) {
            cpt++;
            if (cpt < 5) {
                getPackageJson("../" + packagePath, packages, cpt, cb);
            } else {
                console.log("No package.json");
            }
        } else {
            let installed = JSON.parse(file2).dependencies || { "": "" };
            cb(packages, Object.keys(installed));
        }
    });
};

module.exports = getPackageJson;