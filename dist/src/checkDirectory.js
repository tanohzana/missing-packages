'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _getPackageJson = require('./utils/getPackageJson');

var _getPackageJson2 = _interopRequireDefault(_getPackageJson);

var _extractPackagesToInstall = require('./utils/extractPackagesToInstall');

var _extractPackagesToInstall2 = _interopRequireDefault(_extractPackagesToInstall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkDirectoryRecusrsive = function checkDirectoryRecusrsive(path, packages) {
  _fs2.default.readdirSync(path).forEach(function (file) {
    console.log(file);
    if (file.match(/\.js/g) && !file.match(/\.json/g)) {
      var file2 = _fs2.default.readFileSync(path + '/' + file, 'utf8');
      var newPackages = (0, _extractPackagesToInstall2.default)(file2);

      if (newPackages) {
        newPackages.forEach(function (pack) {
          if (!packages.includes(pack)) {
            packages.push(pack);
          }
        });
      }

      return packages;
    } else if (_fs2.default.lstatSync(path + '/' + file).isDirectory() && file !== 'node_modules') {
      return checkDirectoryRecusrsive(path + '/' + file);
    }
  });
};

// Checks all files in a directory
var checkDirectory = function checkDirectory(path) {
  var packagesFound = [];
  var packageJson = (0, _getPackageJson2.default)();

  if (!packageJson) {
    throw new Error('No package.json found');
  }

  var installedPackagesObject = JSON.parse(packageJson).dependencies || {};
  var installedPackagesArray = Object.keys(installedPackagesObject);

  if (_fs2.default.lstatSync(path).isDirectory()) {
    packagesFound = checkDirectoryRecusrsive(path, packagesFound);
  }

  return { packages: packagesFound, installed: installedPackagesArray };
};

exports.default = checkDirectory;