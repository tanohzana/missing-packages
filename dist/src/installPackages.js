'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _installFromQuestions = require('./utils/installFromQuestions');

var _installFromQuestions2 = _interopRequireDefault(_installFromQuestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prompts the user before installing missing packages
var installPackages = function installPackages(packages, installed) {
  var toInstallQuestions = packages.filter(function (pack) {
    return !installed.includes(pack);
  })
  // eslint-disable-next-line
  .map(function (pack) {
    return {
      default: false,
      message: 'Install package \x1B[32m' + pack + '\x1B[0m ?',
      name: pack,
      type: 'confirm'
    };
  });

  (0, _installFromQuestions2.default)(toInstallQuestions);
};

exports.default = installPackages;