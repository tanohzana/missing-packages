#! /usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _pkginfo = require('pkginfo');

var _pkginfo2 = _interopRequireDefault(_pkginfo);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _displayPackages = require('../src/displayPackages');

var _displayPackages2 = _interopRequireDefault(_displayPackages);

var _installPackages = require('../src/installPackages');

var _installPackages2 = _interopRequireDefault(_installPackages);

var _checkDirectory = require('../src/checkDirectory');

var _checkDirectory2 = _interopRequireDefault(_checkDirectory);

var _checkFile = require('../src/checkFile');

var _checkFile2 = _interopRequireDefault(_checkFile);

var _getPackageJson = require('../src/utils/getPackageJson');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _pkginfo2.default(module, 'version');
var programVersion = module.exports.version;

_commander2.default.version(programVersion, '-v, --version').usage('[options] <file/directory>').option('-i, --install', 'install missing packages in a file or directory').option('-c, --check', 'check missing packages in a file or directory').arguments('<file>').action(function (file) {
  var filePath = file ? process.cwd() + '/' + file : null;
  var isDir = _fs2.default.lstatSync(filePath).isDirectory();

  if (_commander2.default.install && _commander2.default.check) {
    // eslint-disable-next-line
    console.log('\\033[0;31mStop fooling around please !\\033[0m');
    // eslint-disable-next-line
    console.log('Read the doc ! ---> mp -h');
  } else if (_commander2.default.install && isDir) {
    var packagesToInstall = (0, _checkDirectory2.default)(filePath);
    var packagesInstalled = (0, _getPackageJson.getPackagesInstalled)();

    (0, _installPackages2.default)(packagesToInstall, packagesInstalled);
  } else if (_commander2.default.install) {
    var _packagesToInstall = (0, _checkFile2.default)(filePath);
    var _packagesInstalled = (0, _getPackageJson.getPackagesInstalled)();

    (0, _installPackages2.default)(_packagesToInstall, _packagesInstalled);
  } else if (isDir) {
    var _packagesToInstall2 = (0, _checkDirectory2.default)(filePath);
    var _packagesInstalled2 = (0, _getPackageJson.getPackagesInstalled)();

    (0, _displayPackages2.default)(_packagesToInstall2, _packagesInstalled2);
  } else {
    var _packagesToInstall3 = (0, _checkFile2.default)(filePath);
    var _packagesInstalled3 = (0, _getPackageJson.getPackagesInstalled)();

    (0, _displayPackages2.default)(_packagesToInstall3, _packagesInstalled3);
  }
}).parse(process.argv);