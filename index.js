exports.default = function (filePath) {
    try {
        const Transpiler = require("./dist/Transpiler").default;

        Transpiler.transpile(filePath);
        return "";
    } catch(e) {        
        return e.stack ? e.stack : e.toString()
    }
}