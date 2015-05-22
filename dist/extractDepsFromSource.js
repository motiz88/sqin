"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = extractDepsFromSource;
var requiresRegex = /^(?:\s*)--(?:\s*)requires:(?:\s*)([^\s]+)/gmi;

function extractDepsFromSource(sqlSource) {
    return new Promise(function (fulfill, reject) {
        var result = [];
        try {
            var m;
            while ((m = requiresRegex.exec(sqlSource)) !== null) {
                if (m.index === requiresRegex.lastIndex) {
                    requiresRegex.lastIndex++;
                }
                // View your result using the m-variable.
                // eg m[0] etc.
                result.push(m[1]);
            }
        } catch (e) {
            reject(e);
        }
        fulfill(result);
    });
}

module.exports = exports["default"];
//# sourceMappingURL=extractDepsFromSource.js.map