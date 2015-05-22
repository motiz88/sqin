'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = extractCanonicalDepsFromFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _extractDepsFromFile = require('./extractDepsFromFile');

var _extractDepsFromFile2 = _interopRequireDefault(_extractDepsFromFile);

var _getCanonicalId = require('./getCanonicalId');

var _getCanonicalId2 = _interopRequireDefault(_getCanonicalId);

function extractCanonicalDepsFromFile(sqlFile, depsCache) {
    return _rx2['default'].Observable.fromPromise((0, _extractDepsFromFile2['default'])(sqlFile)).flatMap(function (x) {
        return _rx2['default'].Observable.from(x);
    }).flatMap(function (id) {
        // console.log(path.basename(sqlFile) + ':  -- requires: ' + id);
        return (0, _getCanonicalId2['default'])(id, _path2['default'].dirname(sqlFile))['catch'](function (e) {
            e.message = 'In ' + sqlFile + ': ' + e.message;
            throw e;
        });
    });
}

module.exports = exports['default'];
//# sourceMappingURL=extractCanonicalDepsFromFile.js.map