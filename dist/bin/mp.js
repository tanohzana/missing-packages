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

var _checkDirectory3 = require('../src/checkDirectory');

var _checkDirectory4 = _interopRequireDefault(_checkDirectory3);

var _checkFile2 = require('../src/checkFile');

var _checkFile3 = _interopRequireDefault(_checkFile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _pkginfo2.default(module, 'version');
var programVersion = module.exports.version;

_commander2.default.version(programVersion, '-v, --version').usage('[options] <file/directory>').option('-i, --install', 'install missing packages in a file or directory').option('-c, --check', 'check missing packages in a file or directory').arguments('<file>').action(function (file) {
  var filePath = file ? process.cwd() + '/' + file : null;

  if (_commander2.default.install && _commander2.default.check) {
    // eslint-disable-next-line
    console.log('\\033[0;31mStop fooling around please !\\033[0m');
    // eslint-disable-next-line
    console.log('Read the doc ! ---> mp -h');
  } else if (_commander2.default.install) {
    var _checkDirectory = (0, _checkDirectory4.default)(filePath),
        packages = _checkDirectory.packages,
        installed = _checkDirectory.installed;

    (0, _installPackages2.default)(packages, installed);
  } else if (_commander2.default.check) {
    var _checkDirectory2 = (0, _checkDirectory4.default)(filePath),
        _packages = _checkDirectory2.packages,
        _installed = _checkDirectory2.installed;

    (0, _displayPackages2.default)(_packages, _installed);
  } else {
    var _checkFile = (0, _checkFile3.default)(filePath),
        _packages2 = _checkFile.packages,
        _installed2 = _checkFile.installed;

    (0, _displayPackages2.default)(_packages2, _installed2);
  }
}).parse(process.argv);