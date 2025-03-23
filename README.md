# -ecoincome-js-e-invoice-handler

Package is created for reading of e-invoices of type zugpferd and XRechnung.

- ZUGFeRD: https://de.wikipedia.org/wiki/ZUGFeRD
- XRechnung: https://de.wikipedia.org/wiki/XRechnung

Implementation is done in Typescript, based on the the runtime "Deno", see https://deno.com/

To install Deno using npm: `npm install -g deno`

To run tests-suits execute `deno test --allow-read`

These Deno-Extensions are recommendable to work with Deno

- Deno
- Deno VS Code Extension Pack
- deno run ${file}
- Deno Standard Library Snippets

Notes: xRechnung can be submitted in xml formats "UBL" or "UN/CEFACT CII". A UN/CEFACT XRechnung is
based on the same schema file and is identical to the embedded XML structure in a ZUGFeRD 2.0 PDF
according to the EN16931 profile.
