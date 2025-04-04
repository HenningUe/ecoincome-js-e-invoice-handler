import { DOMParserImpl as DOMParser } from "xmldom-ts"
import type { InvoiceXmlReaderBase } from "./xml-reader-base.ts"
import { InvoiceZugpferdXmlReader } from "./xml-reader-zugferd.ts"
import { InvoiceXRechnungUblXmlReader } from "./xml-reader-xrechnung-ubl.ts"

export function createXmlReader(xml: string): InvoiceXmlReaderBase {
  const xmlDoc = new DOMParser().parseFromString(xml)

  let invoiceReader: InvoiceXmlReaderBase
  if (new InvoiceZugpferdXmlReader(xmlDoc).xmlDocIsThisInvoiceType()) {
    invoiceReader = new InvoiceZugpferdXmlReader(xmlDoc)
  } else if (new InvoiceXRechnungUblXmlReader(xmlDoc).xmlDocIsThisInvoiceType()) {
    invoiceReader = new InvoiceXRechnungUblXmlReader(xmlDoc)
  } else {
    throw Error("Unsupported invoice format")
  }
  return invoiceReader
}
