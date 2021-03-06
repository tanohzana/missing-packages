"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _installFromQuestions = require("./utils/installFromQuestions");

var _installFromQuestions2 = _interopRequireDefault(_installFromQuestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Installs packages
var installPackagesString = function installPackagesString(packagesString) {
  if (packagesString.length) {
    _shelljs2.default.exec("npm install --save " + packagesString);
  }
};

// Prompts the user before installing missing packages
var installPackages = function installPackages(packages, installed) {
  var toInstallQuestions = packages.filter(function (pkg) {
    return !installed.includes(pkg);
  }).map(function (pkg) {
    return {
      answer: null,
      message: "Install package \x1B[32m" + pkg + "\x1B[0m ? (y/n)",
      name: pkg
    };
  });

  var initialCpt = 0;

  (0, _installFromQuestions2.default)(toInstallQuestions, initialCpt, function (packagesToInstall) {
    var mappedPackages = packagesToInstall.filter(function (_ref) {
      var answer = _ref.answer;
      return answer === "y";
    }).map(function (pkg) {
      return pkg.name;
    });

    installPackagesString(mappedPackages.join(" "));
  });
};

exports.default = installPackages;