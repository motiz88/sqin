var requiresRegex = /^(?:\s*)--(?:\s*)requires:(?:\s*)([^\s]+)/gmi;

export
default

function extractDepsFromSource(sqlSource) {
    return new Promise((fulfill, reject) => {
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
