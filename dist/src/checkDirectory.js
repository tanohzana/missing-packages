'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _checkFile = require('./checkFile');

var _checkFile2 = _interopRequireDefault(_checkFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkDirectoryRecusrsive = function checkDirectoryRecusrsive(path, packages) {
  _fs2.default.readdirSync(path).forEach(function (file) {
    var filePath = path + '/' + file;

    if (file.match(/\.js/g) && !file.match(/\.json/g)) {
      var newPackages = (0, _checkFile2.default)(filePath);

      if (newPackages) {
        newPackages.forEach(function (pack) {
          if (!packages.includes(pack)) {
            packages.push(pack);
          }
        });
      }

      return packages;
    } else if (_fs2.default.lstatSync(filePath).isDirectory() && file !== 'node_modules') {
      return checkDirectoryRecusrsive(path + '/' + file, packages);
    }

    return [];
  });
};

// Checks all files in a directory
var checkDirectory = function checkDirectory(path) {
  // Passing an empty array to initiate recursivity
  var packagesFound = checkDirectoryRecusrsive(path, []);

  return packagesFound;
};

exports.default = checkDirectory;