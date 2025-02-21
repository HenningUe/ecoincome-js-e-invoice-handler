import * as xpath from "xpath-ts"
import type * as invoiceDefs from "./../invoice-dtos.ts"

class TagMissingError extends Error {}

export abstract class InvoiceXmlReaderBase {
  constructor(public xmlDoc: Document) {}
  abstract readInvoiceFromXml(): invoiceDefs.Invoice

  protected static get1stEl(
    node: Node,
    tagName: string,
  ): Node {
    const nodes = xpath.select(`./${tagName}`, node)
    //@ts-ignore: TS7053
    const node0 = nodes[0]
    if (node0 == null) {
      throw new TagMissingError(
        `No such element: ${tagName}.\n` +
          `Parent node:\n ${node}`,
      )
    }
    return node0
  }

  protected static get1stElMissingOk(
    node: Node,
    tagName: string,
  ): Node | undefined {
    const nodes = xpath.select(`./${tagName}`, node)
    //@ts-ignore: TS7053
    const node0 = nodes[0]
    return node0
  }

  protected static get1stElAttr(
    node: Node,
    tagName: string,
    attrName: string,
    valIfMissing?: string,
  ): string {
    let val: string
    try {
      //@ts-ignore: TS2399
      val = InvoiceXmlReaderBase.get1stEl(node, tagName).getAttribute(attrName)
    } catch (error) {
      if (error instanceof TagMissingError && valIfMissing != undefined) {
        val = valIfMissing
      } else {
        throw error
      }
    }
    return val
  }

  protected static get1stElTxtMissingOk(
    node: Node,
    tagName: string,
    valIfMissing: string | undefined = undefined,
  ): string | undefined {
    let val: string | undefined
    try {
      //@ts-ignore: TS2399
      val = InvoiceXmlReaderBase.get1stEl(node, tagName).textContent
    } catch (error) {
      if (error instanceof TagMissingError) {
        val = valIfMissing
      } else {
        throw error
      }
    }
    return val
  }

  protected static get1stElTxt(
    node: Node,
    tagName: string,
  ): string {
    //@ts-ignore: TS2399
    const val = InvoiceXmlReaderBase.get1stEl(node, tagName).textContent
    return val
  }
}
