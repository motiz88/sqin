import path from 'path';
import Rx from 'rx';

import extractDepsFromFile from './extractDepsFromFile';
import getCanonicalId from './getCanonicalId';

export
default

function extractCanonicalDepsFromFile(sqlFile, depsCache) {
    return Rx.Observable.fromPromise(extractDepsFromFile(sqlFile))
        .flatMap(x => Rx.Observable.from(x))
        .flatMap(id => {
            // console.log(path.basename(sqlFile) + ':  -- requires: ' + id);
            return getCanonicalId(id, path.dirname(sqlFile)).catch(e => {
                e.message = 'In ' + sqlFile + ': ' + e.message;
                throw e;
            });
        });
}
