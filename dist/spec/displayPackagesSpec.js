'use strict';

var _displayPackages = require('../src/displayPackages');

var _displayPackages2 = _interopRequireDefault(_displayPackages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

xdescribe('displayPackages()', function () {
    var installed = [];
    var toInstall = ['lodash'];

    beforeEach(function () {
        spyOn(console, 'log');
    });

    it('should call console.log to display packages to install', function () {
        (0, _displayPackages2.default)(installed, toInstall);
        expect(console.log).toHaveBeenCalled();
    });
});