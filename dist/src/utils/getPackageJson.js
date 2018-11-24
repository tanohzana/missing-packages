'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Does everything it can to find a package.json, even in parent dirs
var getPackageJson = function getPackageJson(packagePath, packages, cpt, cb) {
  _fs2.default.readFile(process.cwd() + '/' + packagePath, 'utf8', function (err, file2) {
    if (err) {
      cpt++;
      if (cpt < 5) {
        getPackageJson('../' + packagePath, packages, cpt, cb);
      } else {
        // eslint-disable-next-line
        console.log('No package.json');
      }
    } else {
      var installed = JSON.parse(file2).dependencies || {};
      cb(packages, Object.keys(installed));
    }
  });
};

exports.default = getPackageJson;