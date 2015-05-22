/* @flow */
import fs from 'mz/fs';
import Rx from 'rx';
import path from 'path';
import glob from './rx-glob';
import resolveDeps from './resolveDeps';

type WritableStream = {
    write: (data: string | Buffer) => boolean
};

export
default

function resolve(entryPointIds: string | string[], out: WritableStream) {
    if (typeof entryPointIds !== 'object' || !('length' in entryPointIds))
        entryPointIds = [entryPointIds];

    return Rx.Observable.from(entryPointIds)
        .flatMap(id => glob.hasMagic(id) ? glob(id) : Rx.Observable.of(id))
        .toArray()
        .flatMap(resolveDeps)
        .flatMap(sqlFile =>
            Rx.Observable.fromPromise(fs.readFile(sqlFile, {
                encoding: 'utf8'
            }))
            .flatMap(fileContents => Rx.Observable.of('-- begin ' + path.basename(sqlFile), fileContents, '-- end ' + path.basename(sqlFile)))
        )
        .forEach(dep => {
            out.write(dep);
            out.write('\n');
        }, e => {
            console.error(e.stack || e.message || e);
        });
}
