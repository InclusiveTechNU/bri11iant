import { createDOM } from "../DOM";
import * as microservice from "../util/microservice";
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
			let htmlTag = outerHTML;
			if (!result.extended) {
				htmlTag = outerHTML.slice(0, outerHTML.indexOf(">") + 1);
			}
			const endPosition = startPosition + htmlTag.length;
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

			microservice.sendDiagnostic(diagnostic, htmlTag);
		}
	}

	const DOM = await createDOM(text, htmlDocument.uri);
	const window = DOM.window;
	const document = window.document;

	// Perform non-element-specific checks
	document.querySelectorAll("body *").forEach(e => {
		// _diagnostics(e, validate.validateAriaLive(e, document));
		_diagnostics(e, validate.validateAriaRole(e));
		_diagnostics(e, validate.validateContrast(e, window));
		_diagnostics(e, validate.validateTabIndex(e));
	});

	// Validate <a> tags
	document.querySelectorAll("a").forEach(e => {
		const result = validate.validateA(e);
		_diagnostics(e, result);
	});

	// Validate <area> tags
	document.querySelectorAll("area").forEach(e => {
		const result = validate.validateArea(e);
		_diagnostics(e, result);
	});

	// Validate <article> tags
	document.querySelectorAll("article").forEach(e => {
		const result = validate.validateArticle(e);
		_diagnostics(e, result);
	});

	// Validate <aside> tags
	document.querySelectorAll("aside").forEach(e => {
		const result = validate.validateAside(e);
		_diagnostics(e, result);
	});

	// Validate <audio> tags
	document.querySelectorAll("audio").forEach(e => {
		const result = validate.validateAudio(e);
		_diagnostics(e, result);
	});

	// Validate <base> tags
	document.querySelectorAll("base").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <br> tags
	document.querySelectorAll("br").forEach(e => {
		const result = validate.validateBR(e);
		_diagnostics(e, result);
	});

	// Validate <button> tags
	document.querySelectorAll("button").forEach(e => {
		const result = validate.validateButton(e);
		_diagnostics(e, result);
	});

	// Validate <caption> tags
	document.querySelectorAll("caption").forEach(e => {
		const result = validate.validateCaption(e);
		_diagnostics(e, result);
	});

	// Validate <col> tags
	document.querySelectorAll("col").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <colgroup> tags
	document.querySelectorAll("colgroup").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <datalist> tags
	document.querySelectorAll("datalist").forEach(e => {
		const result = validate.validateDataList(e);
		_diagnostics(e, result);
	});

	// Validate <dd> tags
	document.querySelectorAll("dd").forEach(e => {
		const result = validate.validateDD(e);
		_diagnostics(e, result);
	});

	// Validate <details> tags
	document.querySelectorAll("details").forEach(e => {
		const result = validate.validateDetails(e);
		_diagnostics(e, result);
	});

	// Validate <dialog> tags
	document.querySelectorAll("dialog").forEach(e => {
		const result = validate.validateDialog(e);
		_diagnostics(e, result);
	});

	// Validate <div> tags
	document.querySelectorAll("div").forEach(e => {
		const result = validate.validateDiv(e);
		_diagnostics(e, result);
	});

	// Validate <dl> tags
	document.querySelectorAll("dl").forEach(e => {
		const result = validate.validateDL(e);
		_diagnostics(e, result);
	});

	// Validate <dt> tags
	document.querySelectorAll("dt").forEach(e => {
		const result = validate.validateDT(e);
		_diagnostics(e, result);
	});

	// Validate <dt> tags
	document.querySelectorAll("embed").forEach(e => {
		const result = validate.validateEmbed(e);
		_diagnostics(e, result);
	});

	// Validate <dt> tags
	document.querySelectorAll("fieldset").forEach(e => {
		const result = validate.validateFieldSet(e);
		_diagnostics(e, result);
	});

	// Validate <dt> tags
	document.querySelectorAll("figcaption").forEach(e => {
		const result = validate.validateFigCaption(e);
		_diagnostics(e, result);
	});

	// Validate <figure> tags
	document.querySelectorAll("figure").forEach(e => {
		const result = validate.validateFigCaption(e);
		_diagnostics(e, result);
	});

	// Validate <figure> tags
	document.querySelectorAll("footer").forEach(e => {
		const result = validate.validateFooter(e);
		_diagnostics(e, result);
	});

	// Validate <form> tags
	document.querySelectorAll("form").forEach(e => {
		const result = validate.validateForm(e);
		_diagnostics(e, result);
	});

	// Validate <head> tags
	document.querySelectorAll("head").forEach(e => {
		_diagnostics(e, validate.validateHead(e));
		_diagnostics(e, validate.validateNoAriaRole(e));
	});

	// Validate header tags
	document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(e => {
		const result = validate.validateHeader(e);
		_diagnostics(e, result);
	});

	// Validate <hr> tags
	document.querySelectorAll("hr").forEach(e => {
		const result = validate.validateHR(e);
		_diagnostics(e, result);
	});

	// Validate <html> tags
	document.querySelectorAll("html").forEach(e => {
		_diagnostics(e, validate.validateHtml(e));
		_diagnostics(e, validate.validateNoAriaRole(e));
	});

	// Validate <iframe> tags
	document.querySelectorAll("iframe").forEach(e => {
		const result = validate.validateIFrame(e);
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

	// Validate <label> elements
	document.querySelectorAll("label").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <legend> tags
	document.querySelectorAll("legend").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <li> elements
	document.querySelectorAll("li").forEach(e => {
		const result = validate.validateLI(e);
		_diagnostics(e, result);
	});

	// Validate <link> elements
	document.querySelectorAll("link").forEach(e => {
		const result = validate.validateLink(e);
		_diagnostics(e, result);
	});

	// Validate <main> elements
	document.querySelectorAll("main").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <map> elements
	document.querySelectorAll("map").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <meta> tags
	document.querySelectorAll("meta").forEach(e => {
		_diagnostics(e, validate.validateMeta(e));
		_diagnostics(e, validate.validateNoAriaRole(e));
	});

	// Validate <menu> tags
	document.querySelectorAll("menu").forEach(e => {
		const result = validate.validateMenu(e);
		_diagnostics(e, result);
	});

	// Validate <meter> tags
	document.querySelectorAll("meter").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <noscript> tags
	document.querySelectorAll("noscript").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <object> tags
	document.querySelectorAll("object").forEach(e => {
		const result = validate.validateObject(e);
		_diagnostics(e, result);
	});

	// Validate <ol> tags
	document.querySelectorAll("ol").forEach(e => {
		const result = validate.validateOl(e);
		_diagnostics(e, result);
	});

	// Validate <optgroup> tags
	document.querySelectorAll("optgroup").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <p> tags
	document.querySelectorAll("p").forEach(e => {
		const result = validate.validateP(e);
		_diagnostics(e, result);
	});

	// Validate <param> tags
	document.querySelectorAll("param").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <picture> tags
	document.querySelectorAll("picture").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <progress> tags
	document.querySelectorAll("progress").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <script> tags
	document.querySelectorAll("script").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <section> tags
	document.querySelectorAll("section").forEach(e => {
		const result = validate.validateSection(e);
		_diagnostics(e, result);
	});

	// Validate <select> tags
	document.querySelectorAll("select").forEach(e => {
		_diagnostics(e, validate.validateSelect(e));
	});

	// Validate <slot> tags
	document.querySelectorAll("slot").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <source> tags
	document.querySelectorAll("source").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <span> tags
	document.querySelectorAll("span").forEach(e => {
		const result = validate.validateSpan(e);
		_diagnostics(e, result);
	});

	// Validate <style> tags
	document.querySelectorAll("style").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <summary> tags
	document.querySelectorAll("summary").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <SVG> tags
	document.querySelectorAll("SVG").forEach(e => {
		const result = validate.validateSVG(e);
		_diagnostics(e, result);
	});

	// Validate <template> tags
	document.querySelectorAll("template").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <textarea> tags
	document.querySelectorAll("textarea").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <title> tags
	document.querySelectorAll("title").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <track> tags
	document.querySelectorAll("track").forEach(e => {
		const result = validate.validateNoAriaRole(e);
		_diagnostics(e, result);
	});

	// Validate <ul> tags
	document.querySelectorAll("ul").forEach(e => {
		const result = validate.validateUl(e);
		_diagnostics(e, result);
	});

	document.querySelectorAll("video").forEach(e => {
		const result = validate.validateVideo();
		_diagnostics(e, result);
	});

}
