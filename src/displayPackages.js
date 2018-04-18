'use strict'

// Displays packages given in parameters
let displayPackages = function(packagesToShow, installed) {
    let display = [];

    packagesToShow.forEach(p => {
        if (!installed.includes(p)) {
            display.push(p);
        }
    });

    console.log("Packages to install: ", display);
};

module.exports = displayPackages;