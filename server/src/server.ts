/*! server.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab 
* https://code.visualstudio.com/api/language-extensions/language-server-extension-guide */

import { globalPattern } from "./patterns";
import * as validate from "./validate";

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
			textDocumentSync: documents.syncKind
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

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	let settings = await getDocumentSettings(textDocument.uri);
	let text = textDocument.getText();
	let problems = 0;
	let m: RegExpExecArray | null;
	let diagnostics: Diagnostic[] = [];

	while ((m = globalPattern.exec(text)) && problems < settings.maxNumberOfProblems) {
		if (m !== null) {
			let el = m[0].slice(0, 5);
			switch (true) {
			// Div
			case (/<div/i.test(el)):
				let resultDiv = await validate.validateDiv(m);
				if (resultDiv) {
					problems++;
					_diagnostics(resultDiv.meta, resultDiv.mess, resultDiv.severity);
				}
				break;
			// A
			case (/<a\s/i.test(el)):
				let resultA = await validate.validateA(m);
				if (resultA) {
					problems++;
					_diagnostics(resultA.meta, resultA.mess, resultA.severity);
				}
				break;
			// Images
			case (/<img/i.test(el)):
				let resultImg = await validate.validateImg(m);
				if (resultImg) {
					problems++;
					_diagnostics(resultImg.meta, resultImg.mess, resultImg.severity);
				}
				break;
			// Input
			case (/<input/i.test(el)):
				let resultInput = await validate.validateInput(m);
				if (resultInput) {
					problems++;
					_diagnostics(resultInput.meta, resultInput.mess, resultInput.severity);
				}
				break;
			// Head, title and meta
			case (/<head/i.test(el)):
				if (/<meta(?:.+?)viewport(?:.+?)>/i.test(m[0])) {
					let resultMeta = await validate.validateMeta(m);
					if (resultMeta) {
						problems++;
						_diagnostics(resultMeta.meta, resultMeta.mess, resultMeta.severity);
					}
				}
				if (!/<title>/i.test(m[0]) || /<title>/i.test(m[0])) {
					let resultTitle = await validate.validateTitle(m);
					if (resultTitle) {
						problems++;
						_diagnostics(resultTitle.meta, resultTitle.mess, resultTitle.severity);
					}
				}
				break;
			// HTML
			case (/<html/i.test(el)):
				let resultHtml = await validate.validateHtml(m);
				if (resultHtml) {
					problems++;
					_diagnostics(resultHtml.meta, resultHtml.mess, resultHtml.severity);
				}
				break;
			// Tabindex
			case (/tabindex/i.test(el)):
				let resultTab = await validate.validateTab(m);
				if (resultTab) {
					problems++;
					_diagnostics(resultTab.meta, resultTab.mess, resultTab.severity);
				}
				break;
			// iframe and frame
			case (/(<frame|<iframe)/i.test(el)):
				let resultFrame = await validate.validateFrame(m);
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

	// Adds diagnostic to diagnostics list
	async function _diagnostics(regEx: RegExpExecArray, diagnosticsMessage: string, severity: DiagnosticSeverity) {
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


	connection.sendDiagnostics({
		uri: textDocument.uri,
		diagnostics
	});
}

documents.listen(connection);
connection.listen();
