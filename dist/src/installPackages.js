"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _installFromQuestions = require("./utils/installFromQuestions");

var _installFromQuestions2 = _interopRequireDefault(_installFromQuestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prompts the user before installing missing packages
var installPackages = function installPackages(packages, installed) {
  var toInstallQuestions = packages.filter(function (pkg) {
    return !installed.includes(pkg);
  }).map(function (pkg) {
    return {
      message: "Install package \x1B[32m" + pkg + "\x1B[0m ? (y/n)",
      answer: null,
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