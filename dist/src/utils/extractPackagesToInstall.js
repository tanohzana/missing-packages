"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Finds all packages to install in a file
var extractPackagesToInstall = function extractPackagesToInstall(fileContent) {
  var requirePackages = fileContent.match(/require\(["'][\x2D0-9A-Z_a-z\u017F\u212A]+["']\)/gi) || [];
  var importPackages = fileContent.match(/import [ ,0-9A-Z_-\}\u017F\u212A]+ ["'][ ,\x2D0-9A-Z_a-z\u017F\u212A]+["']/gi) || [];

  // Removes "require(" and ")"
  var mappedRequirePackages = requirePackages.map(function (pack) {
    return pack.substr(9, pack.length - 11);
  });

  // Removes "import { blabla } from " and "'"
  var mappedImportPackages = importPackages.map(function (pack) {
    var position = pack.indexOf("'") === -1 ? pack.indexOf("\"") : pack.indexOf("'");

    return pack.substr(position + 1, pack.length - (position + 2));
  });

  return [].concat(_toConsumableArray(mappedRequirePackages), _toConsumableArray(mappedImportPackages));
};

exports.default = extractPackagesToInstall;