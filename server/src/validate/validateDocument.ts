import { createDOM } from "../DOM";
import { getDocumentSettings } from "../server";
import * as validate from "./validate";
import {
    Connection,
	Diagnostic,
	TextDocument
} from "vscode-languageserver";

export async function html(htmlDocument: TextDocument, connection: Connection): Promise<void> {
	let settings = await getDocumentSettings(htmlDocument.uri);
	let text: string = htmlDocument.getText();
	let problems = 0;
	let diagnostics: Diagnostic[] = [];

	function _diagnostics(e: Element, result: { severity: any; message: any; } | undefined) {
		if (result && problems < settings.maxNumberOfProblems) {
			const startPosition = text.indexOf(e.outerHTML);
			const severity = result.severity;
			const diagnostic: Diagnostic = {
				severity,
				message: result.message,
				range: {
					start: htmlDocument.positionAt(startPosition),
					end: htmlDocument.positionAt(startPosition + e.outerHTML.length)
				},
				code: 0,
				source: "bri11iant"
			};
			diagnostics.push(diagnostic);
			
			problems++;
			connection.sendDiagnostics({
				uri: htmlDocument.uri,
				diagnostics
			});
		}
	}

	const DOM = await createDOM(text, htmlDocument.uri);
	const document = DOM.window.document;

	// Perform non-element-specific checks
	document.querySelectorAll("body *").forEach(e => {
		const result = validate.validateContrast(e, DOM);
		_diagnostics(e, result);
	});

	// Validate <img> tags
	document.querySelectorAll("img").forEach(e => {
		const result = validate.validateImg(e);
		_diagnostics(e, result);

	});

	// Validate <div> tags
	document.querySelectorAll("div").forEach(e => {
		const result = validate.validateDiv(e);
		_diagnostics(e, result);
	});
}