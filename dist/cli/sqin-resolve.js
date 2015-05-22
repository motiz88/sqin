'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nopt = require('nopt');

var _nopt2 = _interopRequireDefault(_nopt);

var _resolve = require('../resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var config = (0, _nopt2['default'])();

(0, _resolve2['default'])(config.argv.remain, process.stdout);
//# sourceMappingURL=sqin-resolve.js.map