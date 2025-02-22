import { DOMParserImpl as DOMParser } from "xmldom-ts"
import * as xpath from "xpath-ts"
import type { InvoiceXmlReaderBase } from "./xml-reader-base.ts"
import { InvoiceZugpferdXmlReader } from "./xml-reader-zugferd.ts"

export function createXmlReader(xml: string): InvoiceXmlReaderBase {
  const xmlDoc = new DOMParser().parseFromString(xml)

  //### ZUGFERD CrossIndustryInvoice
  //<rsm:CrossIndustryInvoice
  //        xmlns:a="urn:un:unece:uncefact:data:standard:QualifiedDataType:100"
  //        xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  //        xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:10"
  //        xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  //        xmlns:xs="http://www.w3.org/2001/XMLSchema"
  //        xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  const nodes = xpath.select(
    "//rsm:CrossIndustryInvoice[@xmlns:rsm='urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100']",
    //@ts-ignore: TS2345
    xmlDoc,
  )
  //@ts-ignore: TS2399
  if (nodes.length > 0) {
    return new InvoiceZugpferdXmlReader(xmlDoc)
  }

  throw Error("Unsupported invoice format")
}
