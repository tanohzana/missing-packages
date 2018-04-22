'use strict'

// Finds all packages to install in a file
let extractPackagesToInstall = (fileContent) => {
    let packages2 = fileContent.match(/require\(["'][A-Za-z0-9_-]+['"]\)/gi);

    if (packages2 && packages2.length > 0) {
        for (let i in packages2) {
            packages2[i] = packages2[i].substr(9, packages2[i].length - 11);
        }
    } else {
        console.log("No packages to install");
    }

    return packages2 || [];
};

module.exports = extractPackagesToInstall;