'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = rxGlob;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var rxGlobArray = _rx2['default'].Observable.fromNodeCallback(_glob2['default']);

function rxGlob() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    console.log.apply(console, args);
    return rxGlobArray.apply(undefined, args).flatMap(_rx2['default'].Observable.from).tapOnNext(console.log);
}

rxGlob.hasMagic = _glob2['default'].hasMagic;
module.exports = exports['default'];
//# sourceMappingURL=rx-glob.js.map