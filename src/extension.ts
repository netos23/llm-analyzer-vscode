// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { integer } from 'vscode-languageclient';

let diagnosticCollection: vscode.DiagnosticCollection;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "llm-analyzer" is now active!');

	diagnosticCollection = vscode.languages.createDiagnosticCollection('go');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('llm-analyzer.helloWorld', (
		message: string = 'Error there',
		severity: integer = 1,
		file: string = "",
		beginLine: integer = 1, beginColumn: integer = 1,
		endLine: integer = 10, endColumn: integer = 3,
	) => {

		didDiagnosticChange(message, severity, file, beginLine, beginColumn, endLine, endColumn);


		vscode.window.showErrorMessage('Error from llm_analyzer!');
	});

	context.subscriptions.push(disposable);
}

function didDiagnosticChange(
	message: string,
	severity: integer,
	file: string,
	beginLine: integer, beginColumn: integer,
	endLine: integer, endColumn: integer,
): void {
	diagnosticCollection.clear();

	let diagnosticMap: Map<string, vscode.Diagnostic[]> = new Map();
	let canonicalFile = vscode.Uri.file(file).toString();
	let range = new vscode.Range(beginLine, beginColumn, endLine, endColumn);
	let diagnostics = diagnosticMap.get(canonicalFile);
	if (!diagnostics) { diagnostics = []; }
	diagnostics.push(new vscode.Diagnostic(range, message, severity));
	diagnosticMap.set(canonicalFile, diagnostics);
	diagnosticMap.forEach((diags, file) => {
		diagnosticCollection.set(vscode.Uri.parse(file), diags);
	});
}



// This method is called when your extension is deactivated
export function deactivate() { }

