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

var packages = [];
var iterations = 0;
var gblPath = '';

// Checks all files in a directory
var checkDirectory = function checkDirectory(path, recursive, cb) {
  iterations++;

  if (iterations === 1) {
    gblPath = path;
  }

  try {
    if (_fs2.default.lstatSync(path).isDirectory()) {
      _fs2.default.readdirSync(path).forEach(function (file) {
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
        } else if (_fs2.default.lstatSync(path + '/' + file).isDirectory() && file !== 'node_modules' && recursive) {
          checkDirectory(path + '/' + file, recursive, cb);
        }
      });

      if (path === gblPath) {
        (0, _getPackageJson2.default)(packages, cb);
      }
    } else {
      _fs2.default.readFile(path, 'utf8', function (err, file) {
        if (err) {
          // eslint-disable-next-line
          console.log(err);
        } else {
          packages = (0, _extractPackagesToInstall2.default)(file);
          (0, _getPackageJson2.default)(packages, cb);
        }
      });
    }
  } catch (err) {
    if (err.message.substr(0, 6) === 'ENOENT') {
      // eslint-disable-next-line
      console.log('No such file or directory');
    } else {
      // eslint-disable-next-line
      console.log(err);
    }
  }
};

exports.default = checkDirectory;