/*! extension.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import * as path from "path";
import {
	ExtensionContext,
	languages,
	workspace,
	Hover,
	MarkdownString,
	Diagnostic,
	Uri
} from "vscode";
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from "vscode-languageclient";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	let serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
	// The debug options for the server
	// --inspect=6009: runs the server in Node"s Inspector mode so VS Code can attach to the server for debugging
	let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for HTML and CSS documents
		documentSelector: [
			{ language: "html", scheme: "file" }
		],
		synchronize: {
			// Notify the server about file changes to ".clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher("**/.clientrc")
		}
	};

	// Markdown for a link to the Bri11iant docs
	const Bri11iantSample = new MarkdownString(
		"Visit the [Bri11iant docs](http://localhost:3000/docs)"
	);

	// Holds the most recent set of diagnostics
	const diagnosticCollection: Map<string, Diagnostic[]> = new Map();

	// Equality comparison for Diagnostics
	function diagnosticsEqual(d1: Diagnostic, d2: Diagnostic) {
		return d1.message == d2.message && !d1.range.start.compareTo(d2.range.start) && !d1.range.end.compareTo(d2.range.end);
	}

	// Fires whenever a new diagnostic is reported
	context.subscriptions.push(
		languages.onDidChangeDiagnostics(({ uris }) => {
			uris.forEach(uri => {
				const diagnostics = languages.getDiagnostics(uri);
				if (diagnosticCollection.get(uri.path)) {
					const prevDiagnostics = diagnosticCollection.get(uri.path);
					if (prevDiagnostics && diagnostics.length > prevDiagnostics.length) {
						const newDiagnostics = diagnostics.filter(d1 => {
							return !prevDiagnostics.some(d2 => {
								return diagnosticsEqual(d1, d2);
							});
						});
						if (newDiagnostics.length > 0) {
							console.log(newDiagnostics);
						}
					}
				}
				diagnosticCollection.set(uri.path, diagnostics);
			});
		})
	);

	// Register an HTML hover provider to link to the Bri11iant docs
	languages.registerHoverProvider({
		language: "html", scheme: "file"
	}, {
		provideHover(document, position, token) {
			return new Hover(Bri11iantSample);
		}
	});

	// Create the language client and start the client.
	client = new LanguageClient(
		"bri11iantServer",
		"Bri11iant Server",
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
