import type { Invoice } from "./invoice-dtos.ts"
import { Path } from "./pathlib.ts"
import { createXmlReader } from "./xml-reader/xml-reader-factory.ts"

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

const x =
  `C:\\Users\\henningue\\Documents\\Privat\\ecoincome\\einvoice\\ecoincome-js-e-invoice-handler\\packages\\zugpferd\\tests\\resources\\zugferd_2p1_EXTENDED_Warenrechnung.xml`
readInvoiceFromFileSync(x)
