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
var checkFile = function checkFile(cb) {
  for (var _len = arguments.length, paramsForTests = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    paramsForTests[_key - 1] = arguments[_key];
  }

  var path = paramsForTests.length > 0 ? paramsForTests[0] : process.cwd() + '/package.json';

  _fs2.default.readFile(path, 'utf8', function (err, file2) {
    if (err) {
      // eslint-disable-next-line
      console.log('\nIt seems like the file was not found. Stop messing with me please :-)\n\n', err);
    } else {
      var installed = JSON.parse(file2).dependencies || {};
      var main = JSON.parse(file2).main || '';

      if (installed && main) {
        var _path = paramsForTests.length > 0 ? paramsForTests[1] : process.cwd() + '/' + main;

        _fs2.default.readFile(_path, 'utf8', function (err, file) {
          if (err) {
            // eslint-disable-next-line
            console.log('\nIt seems like the file was not found. Stop messing with me please :-)\n\n', err);
          } else {
            var packages = (0, _extractPackagesToInstall2.default)(file);
            cb(packages, Object.keys(installed));
          }
        });
      } else {
        // eslint-disable-next-line
        console.log('No main file in package.json or installed packages');
      }
    }
  });
};

exports.default = checkFile;