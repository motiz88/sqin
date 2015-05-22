#!/usr/bin/env node

import nopt from 'nopt';

var config = nopt();
if (config.argv.remain.indexOf('resolve') === 0) {
    process.argv = process.argv.slice(0, 2).concat(config.argv.remain.slice(1));
    require('./sqin-resolve');
}
