"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _read = require("read");

var _read2 = _interopRequireDefault(_read);

var _npmlog = require("npmlog");

var _npmlog2 = _interopRequireDefault(_npmlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readAsync = _bluebird2.default.promisify(_read2.default);

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

  return read({
    default: answer ? "Entered: " + answer : "",
    prompt: msg
  }).then(function (answer) {
    return readAnswer(msg, answer, opts, true);
  });
};

var installFromQuestions = function installFromQuestions(toInstallQuestions, cpt, cb) {
  // eslint-disable-next-line consistent-return
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

exports.default = installFromQuestions;