"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Find package.json through the deps tree
var getPackageJsonRecursive = function getPackageJsonRecursive(packagePath, cpt) {
  try {
    var file = _fs2.default.readFileSync(process.cwd() + "/" + packagePath, "utf8");

    return file;
  } catch (err) {
    cpt++;
    // Loop recursively only 5 times then abort
    if (cpt < 5) {
      return getPackageJsonRecursive("../" + packagePath, cpt);
    }

    return null;
  }
};

// Tries to find a package.json
var getPackageJson = function getPackageJson() {
  var cpt = 0;
  var packageJson = getPackageJsonRecursive("package.json", cpt);

  return packageJson;
};

// Get packages installed, from package.json
var getPackagesInstalled = function getPackagesInstalled() {
  var packageJson = getPackageJson();

  if (!packageJson) {
    throw new Error(" ❌ No package.json found");
  }

  var installedPackagesObject = JSON.parse(packageJson).dependencies || {};
  var installedPackagesArray = Object.keys(installedPackagesObject);

  return installedPackagesArray;
};

exports.default = getPackageJson;