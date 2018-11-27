'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Displays packages given in parameters
var displayPackages = function displayPackages(packagesToShow, installed) {
  console.log(packagesToShow);
  var display = packagesToShow.filter(function (pack) {
    console.log(pack);return !installed.includes(pack);
  });

  // eslint-disable-next-line
  console.log('Packages to install: ', display);
};

exports.default = displayPackages;