exports.default = function (cb, filePath) {
    try {
        const Transpiler = require("./dist/Transpiler").default;

        Transpiler.transpile(filePath);
        cb(null, "");
    } catch(e) {        
        cb(e.stack ? e.stack : e.toString());
    }
}