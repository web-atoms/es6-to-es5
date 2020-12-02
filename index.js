exports.default = function (filePath) {
    const Transpiler = require("./dist/Transpiler").default;

    Transpiler.transpile(filePath);
}