import * as xpath from "xpath-ts"
import * as invoiceDefs from "../invoice-dtos.ts"
import { InvoiceXmlReaderBase } from "./xml-reader-base.ts"

export class InvoiceZugpferdXmlReader extends InvoiceXmlReaderBase {
  readInvoiceFromXml(): invoiceDefs.Invoice {
    const xmlDoc: Document = this.xmlDoc
    // "<rsm:CrossIndustryInvoice>"
    // "<rsm:SupplyChainTradeTransaction>"
    //   "<ram:IncludedSupplyChainTradeLineItem>"
    const nodes = xpath.select(
      "//rsm:SupplyChainTradeTransaction//ram:IncludedSupplyChainTradeLineItem",
      //@ts-ignore: TS2345
      xmlDoc,
    )

    const tradeLineItems: invoiceDefs.TradeLineItem[] = []
    //@ts-ignore: TS2488
    for (const node of nodes) {
      const tradeLineItem = this.readSingleTradeLineItem(node)
      tradeLineItems.push(tradeLineItem)
    }
    const tradeTransaction = new invoiceDefs.TradeTransaction(tradeLineItems)
    return new invoiceDefs.Invoice(tradeTransaction)
  }

  private readSingleTradeLineItem(node: Node): invoiceDefs.TradeLineItem {
    const get1stEl = InvoiceXmlReaderBase.get1stEl
    const get1stElTxt = InvoiceXmlReaderBase.get1stElTxt
    const get1stElTxtMissingOk = InvoiceXmlReaderBase.get1stElTxtMissingOk
    const get1stElAttr = InvoiceXmlReaderBase.get1stElAttr
    const get1stElMissingOk = InvoiceXmlReaderBase.get1stElMissingOk

    // <ram:SpecifiedTradeProduct>
    //   <ram:GlobalID schemeID="0160">4123456000014</ram:GlobalID>
    //   <ram:SellerAssignedID>ZS997</ram:SellerAssignedID>
    //   <ram:Name>Zitronensäure 100ml</ram:Name>
    //   <ram:ApplicableProductCharacteristic>
    //     <ram:Description>Verpackungsart</ram:Description>
    //     <ram:Value>BO</ram:Value>
    //   </ram:ApplicableProductCharacteristic>
    // </ram:SpecifiedTradeProduct>
    const tradePrdEl = get1stEl(node, "ram:SpecifiedTradeProduct")
    const prdName = get1stElTxt(tradePrdEl, "ram:Name")
    const prdGlobalID = get1stElTxt(tradePrdEl, "ram:GlobalID")
    const schemeID = get1stElAttr(tradePrdEl, "ram:GlobalID", "schemeID")
    const prdSellerAssignedID = get1stElTxt(tradePrdEl, "ram:SellerAssignedID")
    const prdDescription = get1stElTxtMissingOk(tradePrdEl, "ram:Description")

    let applPrdCharacteristic = undefined
    const applPrdCharactEl = get1stElMissingOk(
      tradePrdEl,
      "ram:ApplicableProductCharacteristic",
    )
    if (applPrdCharactEl) {
      const prdCharValue = get1stElTxt(applPrdCharactEl, "ram:Value")
      const prdCharDescription = get1stElTxt(
        applPrdCharactEl,
        "ram:Description",
      )
      applPrdCharacteristic = new invoiceDefs
        .ApplicableProductCharacteristic({
        description: prdCharDescription,
        value: prdCharValue,
      })
    }
    const tradePrd = new invoiceDefs.TradeProduct({
      name: prdName,
      globalId: prdGlobalID,
      schemeId: schemeID,
      sellerAssignedId: prdSellerAssignedID,
      description: prdDescription,
      applicableProductCharacteristic: applPrdCharacteristic,
    })

    // <ram:SpecifiedLineTradeDelivery>
    //   <ram:BilledQuantity unitCode="XBC">15.0000</ram:BilledQuantity>
    //   <ram:PackageQuantity unitCode="XBO">20.0000</ram:PackageQuantity>
    // </ram:SpecifiedLineTradeDelivery>
    const tradeDeliveryEl = get1stEl(node, "ram:SpecifiedLineTradeDelivery")
    const billedQuantityTxt = get1stElTxt(tradeDeliveryEl, "ram:BilledQuantity")
    const billedQuantityNum = parseFloat(billedQuantityTxt)
    const billedQuantityUnitCode = get1stElAttr(
      tradeDeliveryEl,
      "ram:BilledQuantity",
      "unitCode",
    )
    const billedQuantity = new invoiceDefs.QuantityElement({
      unitCode: billedQuantityUnitCode,
      quantity: billedQuantityNum,
    })

    const packageQuantityTxt = get1stElTxt(
      tradeDeliveryEl,
      "ram:PackageQuantity",
    )
    const packageQuantityNum = parseFloat(packageQuantityTxt)
    const packageQuantityUnitCode = get1stElAttr(
      tradeDeliveryEl,
      "ram:PackageQuantity",
      "unitCode",
    )
    const packageQuantity = new invoiceDefs.QuantityElement({
      unitCode: packageQuantityUnitCode,
      quantity: packageQuantityNum,
    })

    const tradeDelivery = new invoiceDefs.TradeDelivery(
      billedQuantity,
      packageQuantity,
    )
    const tradeLineItem = new invoiceDefs.TradeLineItem(tradeDelivery, tradePrd)
    return tradeLineItem
  }
}
