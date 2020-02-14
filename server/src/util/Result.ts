import { DiagnosticSeverity } from "vscode-languageserver";

export interface Result {
    extended?: boolean,
	message: string,
	severity: DiagnosticSeverity
}