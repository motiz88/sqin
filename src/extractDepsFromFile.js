import fs from 'mz/fs';
import extractDepsFromSource from './extractDepsFromSource';

export
default

function extractDepsFromFile(sqlFile) {
    return fs.readFile(sqlFile, {
        encoding: 'utf8'
    }).then(sqlSource => extractDepsFromSource(sqlSource));
}
