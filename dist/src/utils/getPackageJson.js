'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPackagesInstalled = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPackageJsonRecursive = function getPackageJsonRecursive(packagePath, cpt) {
  try {
    var file = _fs2.default.readFileSync(process.cwd() + '/' + packagePath, 'utf8');

    return file;
  } catch (err) {
    cpt++;
    if (cpt < 5) {
      return getPackageJsonRecursive('../' + packagePath, cpt);
    }

    return null;
  }
};

// Does everything it can to find a package.json, even in parent dirs
var getPackageJson = function getPackageJson() {
  var cpt = 0;
  var packageJson = getPackageJsonRecursive('package.json', cpt);

  return packageJson;
};

var getPackagesInstalled = exports.getPackagesInstalled = function getPackagesInstalled() {
  var packageJson = getPackageJson();

  if (!packageJson) {
    throw new Error('No package.json found');
  }

  var installedPackagesObject = JSON.parse(packageJson).dependencies || {};
  var installedPackagesArray = Object.keys(installedPackagesObject);

  return installedPackagesArray;
};

exports.default = getPackageJson;