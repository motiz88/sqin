"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = extractDeps;
var requiresRegex = /^(?:\s*)--(?:\s*)requires:(?:\s*)([^\s]+)/gmi;

function extractDeps(sqlSource) {
    var result = [];
    var m;
    while ((m = requiresRegex.exec(sqlSource)) !== null) {
        if (m.index === requiresRegex.lastIndex) {
            requiresRegex.lastIndex++;
        }
        // View your result using the m-variable.
        // eg m[0] etc.
        result.push(m[1]);
    }
    return result;
}

module.exports = exports["default"];
//# sourceMappingURL=extractDeps.js.map