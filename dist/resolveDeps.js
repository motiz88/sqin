'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = resolveDeps;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _extractCanonicalDepsFromFile = require('./extractCanonicalDepsFromFile');

var _extractCanonicalDepsFromFile2 = _interopRequireDefault(_extractCanonicalDepsFromFile);

var _getCanonicalIds = require('./getCanonicalIds');

var _getCanonicalIds2 = _interopRequireDefault(_getCanonicalIds);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _depresDistDepres = require('depres/dist/depres');

var _depresDistDepres2 = _interopRequireDefault(_depresDistDepres);

function expandNestedDeps(rootId, visitedCache, stack) {
    stack = stack || [];
    visitedCache = visitedCache || {};

    if (rootId in visitedCache) {
        var priorReference = stack.indexOf(rootId);
        if (priorReference !== -1) throw new Error('Circular reference detected:\n    ' + stack.slice(priorReference).concat([rootId]).map(function (s) {
            return '  ' + s;
        }).join('\n -->'));
        return _rx2['default'].Observable.empty();
    }

    visitedCache[rootId] = true;

    var obsDeps = (0, _extractCanonicalDepsFromFile2['default'])(rootId);
    stack = stack.concat(rootId);

    var rootEntry = obsDeps.toArray().map(function (deps) {
        return {
            id: rootId,
            deps: deps
        };
    });

    var depEntries = obsDeps.flatMap(function (depId) {
        return expandNestedDeps(depId, visitedCache, stack);
    });

    return rootEntry.concat(depEntries);
}

function resolveDeps(entryPointIds) {
    if (typeof entryPointIds !== 'object' || !('length' in entryPointIds)) entryPointIds = [entryPointIds];

    var visitedCache = {};

    return _rx2['default'].Observable.create(function (observer) {
        var depMap = {};
        return (0, _getCanonicalIds2['default'])(entryPointIds).concatMap(function (id) {
            return expandNestedDeps(id, visitedCache);
        })
        //.distinct(entry => entry.id)
        .forEach(function (entry) {
            depMap[entry.id] = entry.deps;
        }, function (error) {
            return observer.onError(error);
        }, function () {
            observer.onNext(depMap);
            observer.completed();
        });
    }).map(_depresDistDepres2['default'].resolveMap).map(function (result) {
        return result.resolved;
    }).flatMap(_rx2['default'].Observable.from);

    //return Promise.resolve(null);
}

module.exports = exports['default'];
//# sourceMappingURL=resolveDeps.js.map