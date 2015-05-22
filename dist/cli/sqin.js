#!/usr/bin/node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nopt = require('nopt');

var _nopt2 = _interopRequireDefault(_nopt);

var config = (0, _nopt2['default'])();
if (config.argv.remain.indexOf('resolve') === 0) {
    process.argv = process.argv.slice(0, 2).concat(config.argv.remain.slice(1));
    require('./sqin-resolve');
}
//# sourceMappingURL=sqin.js.map