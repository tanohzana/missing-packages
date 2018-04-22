"use strict";

const displayPackages = require("../src/displayPackages");

describe("displayPackages", () => {
    const installed = [];
    const toInstall = ['lodash'];

    beforeEach(() => {
        spyOn(console, "log");
    });

    it("should call console.log to display packages to install", () => {
        displayPackages(installed, toInstall);
        expect(console.log).toHaveBeenCalled();
    });

});