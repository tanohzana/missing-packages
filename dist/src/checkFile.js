'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _extractPackagesToInstall = require('./utils/extractPackagesToInstall');

var _extractPackagesToInstall2 = _interopRequireDefault(_extractPackagesToInstall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Checks a file before deciding weither to install or display
function checkFile(filePath, knownPackages) {
  var file = _fs2.default.readFileSync(filePath, "utf8");
  var packages = (0, _extractPackagesToInstall2.default)(file);

  if (packages) {
    packages.forEach(function (pack) {
      if (!knownPackages.includes(pack)) {
        knownPackages.push(pack);
      }
    });
  }

  return packages;
}

exports.default = checkFile;