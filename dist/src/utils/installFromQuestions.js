'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _read = require('read');

var _read2 = _interopRequireDefault(_read);

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readAsync = _bluebird2.default.promisify(_read2.default);

// Installs packages
var installPackagesString = function installPackagesString(packagesString) {
  _shelljs2.default.exec('npm install --save ' + packagesString);
};

var installFromQuestions = function installFromQuestions(toInstallQuestions, cpt, cb) {
  readAnswer(toInstallQuestions[cpt].message, toInstallQuestions[cpt].answer).then(function (answer) {
    toInstallQuestions[cpt].answer = answer;

    if (cpt === toInstallQuestions.length - 1) {
      cb(toInstallQuestions);
    } else {
      cpt++;
      return installFromQuestions(toInstallQuestions, cpt, cb);
    }
  });
};

var read = function read(opts) {
  return _bluebird2.default.try(function () {
    _npmlog2.default.clearProgress();
    return readAsync(opts);
  }).finally(function () {
    _npmlog2.default.showProgress();
  });
};

var readAnswer = function readAnswer(msg, answer, opts, isRetry) {
  if (isRetry && (answer === "y" || answer === "n")) {
    return Promise.resolve(answer.trim());
  }

  return read({ prompt: msg, default: answer ? 'Entered: ' + answer : '' }).then(function (answer) {
    return readAnswer(msg, answer, opts, true);
  });
};

exports.default = installFromQuestions;