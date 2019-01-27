"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Compare packages given in parameters and shows those to install
var displayPackages = function displayPackages(packagesToShow, installed) {
  var display = packagesToShow.filter(function (pack) {
    return !installed.includes(pack);
  });

  var message = display.length ? " \u26A1\uFE0F Package(s) to install: " + display.toString() : " ❌ No package to install";

  console.log(message);
};

exports.default = displayPackages;