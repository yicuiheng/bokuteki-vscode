import { workspace, ExtensionContext } from 'vscode';

import {
	Executable,
	LanguageClient,
	LanguageClientOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const serverExecutable: Executable = {
		command: 'bokuteki',
		args: [
			'lsp'],
		options: {
			detached: false,
			shell: true,
		}
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'bokuteki' }],
		synchronize: {
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	client = new LanguageClient(
		'bokutekiLanguageServer',
		'Bokuteki Language Server',
		serverExecutable,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
