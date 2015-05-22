'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = extractDepsFromFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mzFs = require('mz/fs');

var _mzFs2 = _interopRequireDefault(_mzFs);

var _extractDepsFromSource = require('./extractDepsFromSource');

var _extractDepsFromSource2 = _interopRequireDefault(_extractDepsFromSource);

function extractDepsFromFile(sqlFile) {
    return _mzFs2['default'].readFile(sqlFile, {
        encoding: 'utf8'
    }).then(function (sqlSource) {
        return (0, _extractDepsFromSource2['default'])(sqlSource);
    });
}

module.exports = exports['default'];
//# sourceMappingURL=extractDepsFromFile.js.map