'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPackageJsonRecursive = function getPackageJsonRecursive(packagePath, packages, cpt, cb) {
  _fs2.default.readFile(process.cwd() + '/' + packagePath, 'utf8', function (err, file2) {
    if (err) {
      cpt++;
      if (cpt < 5) {
        return getPackageJsonRecursive('../' + packagePath, packages, cpt, cb);
      }

      return null;
    }

    return file2;
  });
};

// Does everything it can to find a package.json, even in parent dirs
var getPackageJson = function getPackageJson(packages, cb) {
  var cpt = 0;
  var packageJson = getPackageJsonRecursive('package.json', packages, cpt, cb);

  if (packageJson) {
    var installed = JSON.parse(packageJson).dependencies || {};
    cb(packages, Object.keys(installed));
  } else {
    // eslint-disable-next-line
    console.log('No package.json');
  }
};

exports.default = getPackageJson;