"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const diagnostics_1 = require("./diagnostics");
const COMMAND = 'code-actions-sample.command';
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider('javascript', new Emojizer(), {
        providedCodeActionKinds: Emojizer.providedCodeActionKinds
    }));
    const emojiDiagnostics = vscode.languages.createDiagnosticCollection("emoji");
    context.subscriptions.push(emojiDiagnostics);
    diagnostics_1.subscribeToDocumentChanges(context, emojiDiagnostics);
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider('javascript', new Emojinfo(), {
        providedCodeActionKinds: Emojinfo.providedCodeActionKinds
    }));
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, () => vscode.env.openExternal(vscode.Uri.parse('https://unicode.org/emoji/charts-12.0/full-emoji-list.html'))));
}
exports.activate = activate;
/**
 * Provides code actions for converting :) to an smiley emoji.
 */
class Emojizer {
    provideCodeActions(document, range) {
        if (!this.isAtStartOfSmiley(document, range)) {
            return;
        }
        const replaceWithSmileyCatFix = this.createFix(document, range, '😺');
        const replaceWithSmileyFix = this.createFix(document, range, '😀');
        // Marking a single fix as `preferred` means that users can apply it with a
        // single keyboard shortcut using the `Auto Fix` command.
        replaceWithSmileyFix.isPreferred = true;
        const replaceWithSmileyHankyFix = this.createFix(document, range, '💩');
        const commandAction = this.createCommand();
        return [
            replaceWithSmileyCatFix,
            replaceWithSmileyFix,
            replaceWithSmileyHankyFix,
            commandAction
        ];
    }
    isAtStartOfSmiley(document, range) {
        const start = range.start;
        const line = document.lineAt(start.line);
        return line.text[start.character] === ':' && line.text[start.character + 1] === ')';
    }
    createFix(document, range, emoji) {
        const fix = new vscode.CodeAction(`Convert to ${emoji}`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.edit.replace(document.uri, new vscode.Range(range.start, range.start.translate(0, 2)), emoji);
        return fix;
    }
    createCommand() {
        const action = new vscode.CodeAction('Learn more...', vscode.CodeActionKind.Empty);
        action.command = { command: COMMAND, title: 'Learn more about emojis', tooltip: 'This will open the unicode emoji page.' };
        return action;
    }
}
exports.Emojizer = Emojizer;
Emojizer.providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
];
/**
 * Provides code actions corresponding to diagnostic problems.
 */
class Emojinfo {
    provideCodeActions(document, range, context, token) {
        // for each diagnostic entry that has the matching `code`, create a code action command
        return context.diagnostics
            .filter(diagnostic => diagnostic.code === diagnostics_1.EMOJI_MENTION)
            .map(diagnostic => this.createCommandCodeAction(diagnostic));
    }
    createCommandCodeAction(diagnostic) {
        const action = new vscode.CodeAction('Learn more...', vscode.CodeActionKind.QuickFix);
        action.command = { command: COMMAND, title: 'Learn more about emojis', tooltip: 'This will open the unicode emoji page.' };
        action.diagnostics = [diagnostic];
        action.isPreferred = true;
        return action;
    }
}
exports.Emojinfo = Emojinfo;
Emojinfo.providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
];
//# sourceMappingURL=extension.js.map