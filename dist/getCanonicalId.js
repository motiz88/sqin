'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = getCanonicalId;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mzFs = require('mz/fs');

var _mzFs2 = _interopRequireDefault(_mzFs);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function getCanonicalId(id, baseDir, resolvedCache) {
    // if (!resolvedCache)
    //     resolvedCache = {};

    // if (id in resolvedCache)
    //     return Promise.resolve(resolvedCache[id]);

    // console.log('   looking up', id, '...');
    var resolvedId = _path2['default'].resolve(baseDir || '', id);

    var extensions = ['', '.sql'];

    return _rx2['default'].Observable.from(extensions).map(function (ext) {
        return resolvedId + ext;
    }).concatMap(function (attemptedId) {
        return _rx2['default'].Observable.fromPromise(_mzFs2['default'].exists(attemptedId)).filter(Boolean) // filter falsy values
        .map(function () {
            return attemptedId;
        });
    }).first()['catch'](function () {
        return _rx2['default'].Observable['throw'](new Error('Could not resolve ID ' + id + ' in ' + (baseDir || '.')));
    });
    // .tap(resolvedId => {
    //     resolvedCache[id] = resolvedId;
    // });
}

module.exports = exports['default'];
//# sourceMappingURL=getCanonicalId.js.map