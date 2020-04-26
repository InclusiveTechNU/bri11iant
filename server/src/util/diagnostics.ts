import { Diagnostic } from "vscode-languageserver";

// Equality comparison for Diagnostics
export const diagnosticsEqual = (d1: Diagnostic, d2: Diagnostic) => {
	return d1.message == d2.message && d1.range.start.character === d2.range.start.character && d1.range.start.line === d2.range.start.line && d1.range.end.character === d2.range.end.character && d1.range.end.line === d2.range.end.line;
}

export interface DiagnosticInfo {
	diagnostic: Diagnostic,
	htmlTag: string
}
