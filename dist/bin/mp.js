#! /usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _pkginfo = require('pkginfo');

var _pkginfo2 = _interopRequireDefault(_pkginfo);

var _displayPackages = require('../src/displayPackages');

var _displayPackages2 = _interopRequireDefault(_displayPackages);

var _installPackages = require('../src/installPackages');

var _installPackages2 = _interopRequireDefault(_installPackages);

var _checkDirectory = require('../src/checkDirectory');

var _checkDirectory2 = _interopRequireDefault(_checkDirectory);

var _checkFile = require('../src/checkFile');

var _checkFile2 = _interopRequireDefault(_checkFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _pkginfo2.default(module, 'version');
var recursive = false;
var programVersion = module.exports.version;

_commander2.default.version(programVersion, '-v, --version').usage('[options] <file/directory>').option('-i, --install', 'install missing packages in a file or directory').option('-c, --check', 'check missing packages in a file or directory').option('-r, --recursive', 'check or install missing packages in directories recursively').arguments('<file>').action(function (file) {
  if (_commander2.default.install && _commander2.default.check) {
    // eslint-disable-next-line
    console.log('\\033[0;31mStop fooling around please !\\033[0m');
    // eslint-disable-next-line
    console.log('Read the doc ! ---> mp -h');
  } else if (_commander2.default.install && _commander2.default.recursive) {
    recursive = true;
    (0, _checkDirectory2.default)(process.cwd() + '/' + file, recursive, _installPackages2.default);
  } else if (_commander2.default.install) {
    (0, _checkDirectory2.default)(process.cwd() + '/' + file, recursive, _installPackages2.default);
  } else if (_commander2.default.check && _commander2.default.recursive) {
    recursive = true;
    (0, _checkDirectory2.default)(process.cwd() + '/' + file, recursive, _displayPackages2.default);
  } else if (_commander2.default.check) {
    (0, _checkDirectory2.default)(process.cwd() + '/' + file, recursive, _displayPackages2.default);
  } else {
    (0, _checkFile2.default)(_displayPackages2.default);
  }
}).parse(process.argv);