import path from 'path';
import fs from 'mz/fs';
import Rx from 'rx';

export
default

function getCanonicalId(id, baseDir, resolvedCache) {
    // if (!resolvedCache)
    //     resolvedCache = {};

    // if (id in resolvedCache)
    //     return Promise.resolve(resolvedCache[id]);

    // console.log('   looking up', id, '...');
    var resolvedId = path.resolve(baseDir || '', id);


    var extensions = ['', '.sql'];

    return Rx.Observable.from(extensions)
        .map(ext => resolvedId + ext)
        .concatMap(function(attemptedId) {
            return Rx.Observable.fromPromise(fs.exists(attemptedId))
                .filter(Boolean) // filter falsy values
                .map(function() {
                    return attemptedId;
                });
        })
        .first()
        .catch(() => Rx.Observable.throw(new Error('Could not resolve ID ' + id + ' in ' + (baseDir || '.'))));
    // .tap(resolvedId => {
    //     resolvedCache[id] = resolvedId;
    // });
}
