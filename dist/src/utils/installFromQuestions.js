'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Installs a single package
var installOnePackage = function installOnePackage(uniquePackage) {
  _shelljs2.default.exec('npm install --save ' + uniquePackage);
};

var installFromQuestions = function installFromQuestions(toInstallQuestions) {
  _inquirer2.default.prompt(toInstallQuestions).then(function (answers) {
    for (var pack in answers) {
      if (answers[pack]) {
        installOnePackage(pack);
      }
    }
  });
};

exports.default = installFromQuestions;