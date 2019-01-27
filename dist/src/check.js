"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _checkFile = require("./checkFile");

var _checkFile2 = _interopRequireDefault(_checkFile);

var _checkDirectory = require("./checkDirectory");

var _checkDirectory2 = _interopRequireDefault(_checkDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Checks all for packages in file(s)
function check(path) {
  var packages = [];
  var isDir = _fs2.default.lstatSync(path).isDirectory();

  // Passing an empty array to initiate recursivity or search one file
  packages = isDir ? (0, _checkDirectory2.default)(path, packages) : (0, _checkFile2.default)(path, packages);

  return packages;
}

exports.default = check;