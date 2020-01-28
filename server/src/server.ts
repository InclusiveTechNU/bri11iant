/*! server.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab 
* https://code.visualstudio.com/api/language-extensions/language-server-extension-guide */

import * as patterns from "./patterns";

import {
	createConnection,
	Diagnostic,
	DiagnosticSeverity,
	DidChangeConfigurationNotification,
	InitializeParams,
	ProposedFeatures,
	TextDocument,
	TextDocuments
} from "vscode-languageserver";

// MARK : Initialize connection to server

// Create a connection for the server
let connection = createConnection(ProposedFeatures.all);

// Create a text document manager
let documents: TextDocuments = new TextDocuments();

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;
	hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
	hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);

	return {
		capabilities: {
			textDocumentSync: documents.syncKind,
			// Tell the client the server does not support code completion
			completionProvider: {
				resolveProvider: false
			}
		}
	};
});

// Called once language server is connected
connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log("Workspace folder change event received.");
			console.log(_event);
		});
	}
});

// MARK: Default Server Settings

interface ServerSettings {
	maxNumberOfProblems: number;
}

const defaultSettings: ServerSettings = { maxNumberOfProblems: 500 };
let globalSettings: ServerSettings = defaultSettings;

// Cache the settings of all open documents
let documentSettings: Map<string, Thenable<ServerSettings>> = new Map();

// Set global settings
connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ServerSettings>(
			(change.settings.bri11iant || defaultSettings)
		);
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ServerSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: "bri11iant"
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Handle closing documents
documents.onDidClose((e: { document: { uri: string; }; }) => {
	documentSettings.delete(e.document.uri);
	connection.sendDiagnostics({
		uri: e.document.uri, diagnostics: []
	});
});

// Handle document content changing
documents.onDidChangeContent((change: { document: TextDocument; }) => {
	validateTextDocument(change.document);
});

// Check for valid accessibility practices
/*
async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	let settings = await getDocumentSettings(textDocument.uri);
	let text = textDocument.getText();
	let problems = 0;
	let m: RegExpExecArray | null;
	let diagnostics: Diagnostic[] = [];

	while ((m = patterns.pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
		if (m !== null) {
			let el = m[0].slice(0, 5);
			connection.console.log(el);
			switch (true) {
			// ID
			// case (/id="/i.test(el)):
			// 	let resultId = await pattern.validateId(m);
			// 	if (resultId) {
			// 		problems++;
			// 		_diagnostics(resultId.meta, resultId.mess);
			// 	}
			// 	break;
			// Div
			case (/<div/i.test(el)):
				let resultDiv = await patterns.validateDiv(m);
				if (resultDiv) {
					problems++;
					_diagnostics(resultDiv.meta, resultDiv.mess, resultDiv.severity);
				}
				break;
				// Span
			case (/<span/i.test(el)):
				let resultSpan = await patterns.validateSpan(m);
				if (resultSpan) {
					problems++;
					_diagnostics(resultSpan.meta, resultSpan.mess, resultSpan.severity);
				}
				break;
				// Links
			case (/<a\s/i.test(el)):
				let resultA = await patterns.validateA(m);
				if (resultA) {
					problems++;
					_diagnostics(resultA.meta, resultA.mess, resultA.severity);
				}
				break;
				// Images
			case (/<img/i.test(el)):
				let resultImg = await patterns.validateImg(m);
				if (resultImg) {
					problems++;
					_diagnostics(resultImg.meta, resultImg.mess, resultImg.severity);
				}
				break;
				// input
			case (/<inpu/i.test(el)):
				let resultInput = await patterns.validateInput(m);
				if (resultInput) {
					problems++;
					_diagnostics(resultInput.meta, resultInput.mess, resultInput.severity);
				}
				break;
				// Head, title and meta
			case (/<head/i.test(el)):
				if (/<meta(?:.+?)viewport(?:.+?)>/i.test(m[0])) {
					let resultMeta = await patterns.validateMeta(m);
					if (resultMeta) {
						problems++;
						_diagnostics(resultMeta.meta, resultMeta.mess, resultMeta.severity);
					}
				}
				if (!/<title>/i.test(m[0]) || /<title>/i.test(m[0])) {
					let resultTitle = await patterns.validateTitle(m);
					if (resultTitle) {
						problems++;
						_diagnostics(resultTitle.meta, resultTitle.mess, resultTitle.severity);
					}
				}
				break;
				// HTML
			case (/<html/i.test(el)):
				let resultHtml = await patterns.validateHtml(m);
				if (resultHtml) {
					problems++;
					_diagnostics(resultHtml.meta, resultHtml.mess, resultHtml.severity);
				}
				break;
				// Tabindex
			case (/tabin/i.test(el)):
				let resultTab = await patterns.validateTab(m);
				if (resultTab) {
					problems++;
					_diagnostics(resultTab.meta, resultTab.mess, resultTab.severity);
				}
				break;
				// iframe and frame
			case (/(<fram|<ifra)/i.test(el)):
				let resultFrame = await patterns.validateFrame(m);
				if (resultFrame) {
					problems++;
					_diagnostics(resultFrame.meta, resultFrame.mess, resultFrame.severity);
				}
				break;
			default:
				break;
			}
		}
	}

	async function _diagnostics(regEx: RegExpExecArray, diagnosticsMessage: string, severityNumber: number) {
		let severity: DiagnosticSeverity = DiagnosticSeverity.Hint;

		switch (severityNumber) {
		case 1:
			severity = DiagnosticSeverity.Error;
			break;
		case 2:
			severity = DiagnosticSeverity.Warning;
			break;
		case 3:
			severity = DiagnosticSeverity.Information;
			break;
		case 4:
			// Handled in initialization
			break;
		}

		let diagnostic: Diagnostic = {
			severity,
			message: diagnosticsMessage,
			range: {
				start: textDocument.positionAt(regEx.index),
				end: textDocument.positionAt(regEx.index + regEx[0].length),
			},
			code: 0,
			source: "bri11iant"
		};

		diagnostics.push(diagnostic);
	}
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
*/

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	let settings = await getDocumentSettings(textDocument.uri);
	let text = textDocument.getText();
	let problems = 0;
	let m: RegExpExecArray | null;
	let diagnostics: Diagnostic[] = [];

	connection.sendDiagnostics({
		uri: textDocument.uri,
		diagnostics
	});
}

documents.listen(connection);
connection.listen();
