"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Finds all packages to install in a file
var extractPackagesToInstall = function extractPackagesToInstall(fileContent) {
  var packages = fileContent.match(/require\(["'][\x2D0-9A-Z_a-z\u017F\u212A]+["']\)/gi);

  if (!packages) {
    return [];
  }

  // removes "require(" and ")"
  var mappedPackages = packages.map(function (pack) {
    return pack.substr(9, pack.length - 11);
  });

  return mappedPackages;
};

exports.default = extractPackagesToInstall;