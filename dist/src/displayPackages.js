"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Displays packages given in parameters
var displayPackages = function displayPackages(packagesToShow, installed) {
  var display = packagesToShow.filter(function (pack) {
    return !installed.includes(pack);
  }).map(function (pack) {
    return pack;
  });

  // eslint-disable-next-line
  console.log("Packages to install: " + display.toString());
};

exports.default = displayPackages;