/* @flow */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = resolve;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mzFs = require('mz/fs');

var _mzFs2 = _interopRequireDefault(_mzFs);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rxGlob = require('./rx-glob');

var _rxGlob2 = _interopRequireDefault(_rxGlob);

var _resolveDeps = require('./resolveDeps');

var _resolveDeps2 = _interopRequireDefault(_resolveDeps);

function resolve(entryPointIds, out) {
    if (typeof entryPointIds !== 'object' || !('length' in entryPointIds)) entryPointIds = [entryPointIds];

    return _rx2['default'].Observable.from(entryPointIds).flatMap(function (id) {
        return _rxGlob2['default'].hasMagic(id) ? (0, _rxGlob2['default'])(id) : _rx2['default'].Observable.of(id);
    }).toArray().flatMap(_resolveDeps2['default']).flatMap(function (sqlFile) {
        return _rx2['default'].Observable.fromPromise(_mzFs2['default'].readFile(sqlFile, {
            encoding: 'utf8'
        })).flatMap(function (fileContents) {
            return _rx2['default'].Observable.of('-- begin ' + _path2['default'].basename(sqlFile), fileContents, '-- end ' + _path2['default'].basename(sqlFile));
        });
    }).forEach(function (dep) {
        out.write(dep);
        out.write('\n');
    }, function (e) {
        console.error(e.stack || e.message || e);
    });
}

module.exports = exports['default'];
//# sourceMappingURL=resolve.js.map