"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class JSActionProvider {
    activate(subscriptions) {
        this.command = vscode.commands.registerCommand(JSActionProvider.commandId, this.runAddRullAction, this);
        // this.reactCommand = vscode.commands.registerCommand(HaskellLintingProvider.reactCommandId, this.runAddRullAction, this);
        subscriptions.push(this);
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection();
    }
    provideCodeActions(document, range, context, token) {
        let diagnostic = context.diagnostics[0];
        if (diagnostic.source === 'eslint') {
            return [{
                    title: `Disable eslint rule (${diagnostic.code})`,
                    command: JSActionProvider.commandId,
                    arguments: [document, diagnostic]
                }];
        }
        else {
            return null;
        }
    }
    dispose() {
        this.diagnosticCollection.clear();
        this.diagnosticCollection.dispose();
        this.command.dispose();
    }
}
JSActionProvider.commandId = 'javascript.runCodeAction';
exports.default = GoCodeActionProvider;
//# sourceMappingURL=jslinter.js.map