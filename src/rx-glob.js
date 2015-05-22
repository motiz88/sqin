import Rx from 'rx';
import glob from 'glob';

var rxGlobArray = Rx.Observable.fromNodeCallback(glob);

export
default

function rxGlob(...args) {
    return rxGlobArray(...args).flatMap(Rx.Observable.from)
        .tapOnNext(console.log);
}

rxGlob.hasMagic = glob.hasMagic;
