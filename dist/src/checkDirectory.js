'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash.uniq');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkFile = require('./checkFile');

var _checkFile2 = _interopRequireDefault(_checkFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkDirectoryRecursive(path, knownPackages) {
  var localPackages = [];

  _fs2.default.readdirSync(path).forEach(function (file) {
    var filePath = path + '/' + file;

    if (_fs2.default.lstatSync(filePath).isDirectory() && file !== "node_modules") {
      localPackages = localPackages.concat(checkDirectoryRecursive(path + '/' + file, knownPackages));
    } else if (file.match(/\.js/g) && !file.match(/\.json/g)) {
      localPackages = localPackages.concat((0, _checkFile2.default)(filePath, knownPackages));
    }
  });

  knownPackages = knownPackages.concat(localPackages);

  return (0, _lodash2.default)(knownPackages);
}

exports.default = checkDirectoryRecursive;