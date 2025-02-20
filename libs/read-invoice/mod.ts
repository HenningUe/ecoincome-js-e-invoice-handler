import { Path } from "@e-invoice/pathlib-py2ts"

import type { Invoice } from "./src/invoice-dtos.ts"
import { createXmlReader } from "./src/xml-reader/xml-reader-factory.ts"

export function readInvoiceFromFileSync(
  filePath: Path | string,
): Invoice {
  const file = new Path(filePath)
  const xml = file.readTextSync()
  const invoice = createXmlReader(xml).readInvoiceFromXml()
  return invoice
}

export async function readInvoiceFromFile(
  filePath: Path | string,
): Promise<Invoice> {
  const file = new Path(filePath)
  const invoice = await file.readText().then((xml) => {
    return createXmlReader(xml).readInvoiceFromXml()
  })
  return invoice
}
