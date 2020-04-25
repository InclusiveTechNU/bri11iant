/*! server.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import * as validateDocument from "./validate/validateDocument";
import {
	createConnection,
	DidChangeConfigurationNotification,
	InitializeParams,
	ProposedFeatures,
	TextDocument,
	TextDocuments
} from "vscode-languageserver";

let connection = createConnection(ProposedFeatures.all);
let documents: TextDocuments = new TextDocuments();
let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;

// Called when the server is connected to
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
	userId: string;
}

const defaultSettings: ServerSettings = {
	maxNumberOfProblems: 500,
	userId: "user-id"
};
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

export function getDocumentSettings(resource: string): Thenable<ServerSettings> {
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

async function validateTextDocument(textDocument: TextDocument) {
	validateDocument.html(textDocument, connection);
	// TODO: Add more document types later
}

documents.listen(connection);
connection.listen();
