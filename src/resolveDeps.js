import extractCanonicalDepsFromFile from './extractCanonicalDepsFromFile';
import getCanonicalIds from './getCanonicalIds';
import Rx from 'rx';
import depres from 'depres/dist/depres';

function expandNestedDeps(rootId, visitedCache, stack) {
    stack = stack || [];
    visitedCache = visitedCache || {};

    if (rootId in visitedCache) {
        var priorReference = stack.indexOf(rootId);
        if (priorReference !== -1)
            throw new Error('Circular reference detected:\n    ' + stack.slice(priorReference).concat([rootId]).map(s => '  ' + s).join('\n -->'));
        return Rx.Observable.empty();
    }

    visitedCache[rootId] = true;

    var obsDeps = extractCanonicalDepsFromFile(rootId);
    stack = stack.concat(rootId);

    var rootEntry = obsDeps
        .toArray()
        .map(deps => ({
            id: rootId,
            deps
        }));

    var depEntries = obsDeps
        .flatMap(
            depId => expandNestedDeps(depId, visitedCache, stack)
        );

    return rootEntry
        .concat(depEntries);
}

export
default

function resolveDeps(entryPointIds) {
    if (typeof entryPointIds !== 'object' || !('length' in entryPointIds))
        entryPointIds = [entryPointIds];

    var visitedCache = {};

    return Rx.Observable.create(observer => {
        var depMap = {};
        return getCanonicalIds(entryPointIds)
            .concatMap(id => expandNestedDeps(id, visitedCache))
            //.distinct(entry => entry.id)
            .forEach(entry => {
                depMap[entry.id] = entry.deps;
            }, error => observer.onError(error), () => {
                observer.onNext(depMap);
                observer.completed();
            });
        })
    .map(depres.resolveMap)
    .map(result => result.resolved)
    .flatMap(Rx.Observable.from);


    //return Promise.resolve(null);
}
