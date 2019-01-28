#! /usr/bin/env node
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _displayPackages = require("../src/displayPackages");

var _displayPackages2 = _interopRequireDefault(_displayPackages);

var _installPackages = require("../src/installPackages");

var _installPackages2 = _interopRequireDefault(_installPackages);

var _check = require("../src/check");

var _check2 = _interopRequireDefault(_check);

var _getPackageJson = require("../src/utils/getPackageJson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var misuse = function misuse() {
  // eslint-disable-next-line no-console
  console.log("MP was misused. Go to README");
};

var mp = function mp(args) {
  var firstParam = args.shift();
  var secondParam = args.shift();
  var packagesInstalled = (0, _getPackageJson.getPackagesInstalled)();

  if ((firstParam === "i" || firstParam === "install") && _fs2.default.existsSync(process.cwd() + "/" + secondParam)) {
    var filePath = process.cwd() + "/" + secondParam;
    var packagesToInstall = (0, _check2.default)(filePath);

    (0, _installPackages2.default)(packagesToInstall, packagesInstalled);
  } else if ((firstParam === "c" || firstParam === "check") && _fs2.default.existsSync(process.cwd() + "/" + secondParam)) {
    var _filePath = process.cwd() + "/" + secondParam;
    var _packagesToInstall = (0, _check2.default)(_filePath);

    (0, _displayPackages2.default)(_packagesToInstall, packagesInstalled);
  } else if (_fs2.default.existsSync(process.cwd() + "/" + firstParam)) {
    var _filePath2 = process.cwd() + "/" + firstParam;
    var _packagesToInstall2 = (0, _check2.default)(_filePath2);

    (0, _installPackages2.default)(_packagesToInstall2, packagesInstalled);
  } else {
    misuse();
  }
};

var args = process.argv.splice(2);
mp(args);