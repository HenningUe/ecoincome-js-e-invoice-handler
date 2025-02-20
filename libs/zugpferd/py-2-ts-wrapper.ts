import { python } from "https://deno.land/x/python/mod.ts";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
//import.meta.filename

//export DENO_PYTHON_PATH=/Users/casianorodriguezleon/.pyenv/versions/3.11.4/lib/libpython3.11.dylib

export function test_main() {
	const currentFile = fileURLToPath(import.meta.url);
	const scriptDir = path.dirname(currentFile);
	const venvDir = path.join(scriptDir, "py", ".venv");
	const filePath = path.join(venvDir, "Scripts", "python3.dll");
	Deno.env.set("DENO_PYTHON_PATH", filePath);

	const site = python.import("site");
	const sitepDir = path.join(venvDir, "Lib", "site-packages");
	site.addsitedir(sitepDir);
	const pyModDrafthorseDoc = python.import("drafthorse.models.document");

	const testSamleDir = path.join(scriptDir, "tests", "resources");
	const sampleXmlFileP = path.join(
		testSamleDir,
		"zugferd_2p3_EXTENDED_Kostenrechnung.xml",
	);
	const samplexml = python.builtins.open(sampleXmlFileP, "rb").read();
	let doc = pyModDrafthorseDoc.Document.parse(samplexml);
	console.log(doc.trade.agreement.seller.name);
	let x = 1;
}

test_main();
