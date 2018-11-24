'use strict';

var _checkFile = require('../src/checkFile');

var _checkFile2 = _interopRequireDefault(_checkFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('checkFile()', function () {
    it('should use the callback and equal 2', function () {
        (0, _checkFile2.default)(function (toInstall, installed) {
            expect(installed.length - toInstall.length).toEqual(2);
        }, process.cwd() + '/spec/support/packageForTests.json', process.cwd() + '/spec/support/mainForTests.js');
    });
});