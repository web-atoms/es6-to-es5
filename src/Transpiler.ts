import { join, parse } from "path";
import * as ts from "typescript";
export default class Transpiler {

    private static getOptions(): ts.CompilerOptions {
        return {
            noImplicitAny: false,
            strictNullChecks: false,
            strictFunctionTypes: false,
            strictPropertyInitialization: false,
            strictBindCallApply: false,
            noImplicitThis: false,
            alwaysStrict: false,

            noImplicitReturns: false,
            noUncheckedIndexedAccess: false,
            noUnusedLocals: false,
            noUnusedParameters: false,


            useDefineForClassFields: false,
            allowUnreachableCode: true,
            allowUnusedLabels: true,
            noEmitHelpers: false,
            noLib: false,
            noStrictGenericChecks: false,
            preserveConstEnums: false,
            skipLibCheck: true,

            downlevelIteration: false,
            removeComments: false,
            checkJs: false,
            allowJs: true,
            declaration: false,
            sourceMap: true,
            importHelpers: false,

            esModuleInterop: false,
            experimentalDecorators: true,
            emitDecoratorMetadata: false,

            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.None
        };
    }

    public static transpile(filePath: string) {

        if (filePath.endsWith(".es5.js"))
            return;

        let defaults = this.getOptions();

        const fileNameWithoutExtension = filePath.substring(0, filePath.length - 3);

        defaults.outFile = fileNameWithoutExtension + ".es5.js";


        // save...
        let program = ts.createProgram([filePath], defaults);
        let emitResult = program.emit();

        let allDiagnostics = ts
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);

        let errors = [];
    
        allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file) {
                let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
                let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                errors.push(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
                errors.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
            }
        });

        if (emitResult.emitSkipped) {
            // throw...
            throw new Error(errors.join("\n"));
        }
    }

}