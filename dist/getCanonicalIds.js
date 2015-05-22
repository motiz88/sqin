'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = getCanonicalIds;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _getCanonicalId = require('./getCanonicalId');

var _getCanonicalId2 = _interopRequireDefault(_getCanonicalId);

function getCanonicalIds(ids, base, resolvedCache) {
    resolvedCache = resolvedCache || {};
    return _rx2['default'].Observable.from(ids).flatMap(function (id) {
        return (0, _getCanonicalId2['default'])(id, base, resolvedCache);
    });
}

module.exports = exports['default'];
//# sourceMappingURL=getCanonicalIds.js.map