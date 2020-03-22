import { createDOM } from "../DOM";
import { getDocumentSettings } from "../server";
import { Result } from "./Result";
import * as validate from "./validate";
import {
    Connection,
	Diagnostic,
	TextDocument
} from "vscode-languageserver";

export async function html(htmlDocument: TextDocument, connection: Connection): Promise<void> {
	const uri = htmlDocument.uri;
	const uriPath = uri.substr(0, uri.lastIndexOf("\/") + 1);
	let settings = await getDocumentSettings(htmlDocument.uri);
	let text: string = htmlDocument.getText();
	let problems = 0;
	let diagnostics: Diagnostic[] = [];

	function _diagnostics(e: Element, result: Result | undefined) {
		if (result && problems < settings.maxNumberOfProblems) {
			let outerHTML = e.outerHTML;
			let startPosition = text.indexOf(outerHTML);
			if (startPosition === -1) {
				outerHTML = outerHTML.replace(uriPath, "");
				startPosition = text.indexOf(outerHTML);
			}
			let endPosition
			if (result.extended) {
				endPosition = startPosition + outerHTML.length;
			} else {
				endPosition = startPosition + outerHTML.slice(0, outerHTML.indexOf(">") + 1).length;
			}
			const severity = result.severity;
			const diagnostic: Diagnostic = {
				severity,
				message: result.message,
				range: {
					start: htmlDocument.positionAt(startPosition),
					end: htmlDocument.positionAt(endPosition)
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
	const window = DOM.window;
	const document = window.document;

	// Perform non-element-specific checks
	document.querySelectorAll("body *").forEach(e => {
		_diagnostics(e, validate.validateAriaLive(e, document));
		_diagnostics(e, validate.validateAriaRole(e));
		_diagnostics(e, validate.validateContrast(e, window));
		_diagnostics(e, validate.validateTabIndex(e));
	});

	// Validate <a> tags
	document.querySelectorAll("a").forEach(e => {
		const result = validate.validateA(e);
		_diagnostics(e, result);
	});

	// Validate <audio> tags
	document.querySelectorAll("audio").forEach(e => {
		const result = validate.validateAudio(e);
		_diagnostics(e, result);
	});

	// Validate <div> tags
	document.querySelectorAll("div").forEach(e => {
		const result = validate.validateDiv(e);
		_diagnostics(e, result);
	});

	// Validate <head> tags
	document.querySelectorAll("head").forEach(e => {
		const result = validate.validateHead(e);
		_diagnostics(e, result);
	});

	// Validate <html> tags
	document.querySelectorAll("html").forEach(e => {
		const result = validate.validateHtml(e);
		_diagnostics(e, result);
	});

	// Validate <img> tags
	document.querySelectorAll("img").forEach(async e => {
		const result = await validate.validateImg(e)
		_diagnostics(e, result);
	});
	
	// Validate <input> elements
	document.querySelectorAll("input").forEach(e => {
		const result = validate.validateInput(e);
		_diagnostics(e, result);
	});

	// Validate <meta> tags
	document.querySelectorAll("meta").forEach(e => {
		const result = validate.validateMeta(e);
		_diagnostics(e, result);
	});

	// Validate <span> tags
	document.querySelectorAll("span").forEach(e => {
		const result = validate.validateSpan(e);
		_diagnostics(e, result);
	});

}