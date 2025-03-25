import * as xpath from "xpath-ts"
import * as invoiceDefs from "../invoice-dtos.ts"
import { InvoiceXmlReaderBase } from "./xml-reader-base.ts"

/**
 * Reads an XRechnung UBL XML invoice.
 *
 * information about the XRechnung UBL XML format:
 * - https://schemas.liquid-technologies.com/OASIS/UBL/2.0/?page=invoicetypecode.html
 * - https://www.mustangproject.org/xrechnung/?lang=en
 * - https://docs.peppol.eu/poacc/billing/3.0/2024-Q2/
 * - https://portal3.gefeg.com/projectdata/invoice/deliverables/installed/publishingproject/xrechnung%202.0.0%20-%20(ab%2001.01.2021)/xrechnung_ubl_invoice_extension_v2.0.0_01.07.2020.scm/html/de/021.htm?https://portal3.gefeg.com/projectdata/invoice/deliverables/installed/publishingproject/xrechnung%202.0.0%20-%20(ab%2001.01.2021)/xrechnung_ubl_invoice_extension_v2.0.0_01.07.2020.scm/html/de/02301.htm
 * interactive illustration of the XRechnung UBL XML format:
 * - https://www.erechnung.gv.at/erb/info_channel_explanation?ubl
 */
export class InvoiceXRechnungUblXmlReader extends InvoiceXmlReaderBase {
  override xmlDocIsThisInvoiceType(): boolean {
    //### XRechnung UBL
    // <ubl:Invoice xmlns:ubl="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
    // xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
    // xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    const nodes = xpath.select(
      "//ubl:Invoice[@xmlns:ubl='urn:oasis:names:specification:ubl:schema:xsd:Invoice-2']",
      //@ts-ignore: TS2345
      this.xmlDoc,
    )
    //@ts-ignore: TS2399
    return nodes.length > 0
  }

  readInvoiceFromXml(): invoiceDefs.Invoice {
    const xmlDoc: Document = this.xmlDoc
    // "<ubl:Invoice>"
    //   "<cac:InvoiceLine>"
    const nodes = xpath.select(
      "//ubl:Invoice/cac:InvoiceLine",
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

  private readSingleTradeLineItem(invoiceLine: Node): invoiceDefs.TradeLineItem {
    const get1stEl = InvoiceXmlReaderBase.get1stEl
    const get1stElTxt = InvoiceXmlReaderBase.get1stElTxt
    const get1stElTxtMissingOk = InvoiceXmlReaderBase.get1stElTxtMissingOk
    const get1stElAttr = InvoiceXmlReaderBase.get1stElAttr
    const get1stElMissingOk = InvoiceXmlReaderBase.get1stElMissingOk

    // XRechung UBL standard
    // <cac:InvoiceLine>
    //   <cbc:ID>1</cbc:ID>
    //   <cbc:InvoicedQuantity unitCode="EA">10</cbc:InvoicedQuantity>
    //   <cbc:LineExtensionAmount currencyID="GBP">1200.00</cbc:LineExtensionAmount>
    //   <cac:OrderLineReference>
    //       <cbc:LineID>1</cbc:LineID>
    //   </cac:OrderLineReference>
    //   <cac:Item>
    //       <cbc:Name>Test item, category Z</cbc:Name>
    //      <cbc:Description>Positionsbeschreibung (BT-154)</cbc:Description>
    //       <cac:BuyersItemIdentification>
    //         <cbc:ID>Artikelnummer des Käufers (BT-156)</cbc:ID>
    //       </cac:BuyersItemIdentification>
    //       <cac:SellersItemIdentification>
    //         <cbc:ID>Artikelnummer des Verkäufers (BT-155)</cbc:ID>
    //       </cac:SellersItemIdentification>
    //       <cac:StandardItemIdentification>
    //           <cbc:ID schemeID="0160">192387129837129873</cbc:ID>
    //       </cac:StandardItemIdentification>
    //       <cac:ClassifiedTaxCategory>
    //           <cbc:ID>E</cbc:ID>
    //           <cbc:Percent>0</cbc:Percent>
    //           <cac:TaxScheme>
    //               <cbc:ID>VAT</cbc:ID>
    //           </cac:TaxScheme>
    //       </cac:ClassifiedTaxCategory>
    //   </cac:Item>
    //   <cac:Price>
    //       <cbc:PriceAmount currencyID="GBP">120.00</cbc:PriceAmount>
    //   </cac:Price>
    // </cac:InvoiceLine>
    //
    // For comparision: The same code for ZUGFeRD:
    // <ram:SpecifiedTradeProduct>
    //   <ram:GlobalID schemeID="0160">4123456000014</ram:GlobalID> //GTIN (Global article number)
    //   <ram:SellerAssignedID>ZS997</ram:SellerAssignedID>
    //   <ram:Name>Zitronensäure 100ml</ram:Name>
    //   <ram:ApplicableProductCharacteristic>
    //     <ram:Description>Verpackungsart</ram:Description>
    //     <ram:Value>BO</ram:Value>
    //   </ram:ApplicableProductCharacteristic>
    // </ram:SpecifiedTradeProduct>

    /// ---------------------
    /// --- TradeProduct ---
    const tradePrdEl = get1stEl(invoiceLine, "cac:Item")
    const prdName = get1stElTxt(tradePrdEl, "cbc:Name")
    const prdDescription = get1stElTxtMissingOk(tradePrdEl, "cbc:Description")
    const stdItemID = get1stElTxtMissingOk(tradePrdEl, "cac:StandardItemIdentification/cbc:ID")
    let schemeID = undefined
    if (stdItemID) {
      schemeID = get1stElAttr(tradePrdEl, "cac:StandardItemIdentification/cbc:ID", "schemeID")
    }
    const prdSellerAssignedID = get1stElTxtMissingOk(
      tradePrdEl,
      "cac:SellersItemIdentification/cbc:ID",
    )
    const prdBuyerAssignedID = get1stElTxtMissingOk(
      tradePrdEl,
      "cac:BuyersItemIdentification/cbc:ID",
    )

    // /cac:Item/cac:AdditionalItemProperty
    // /cac:Item/cac:AdditionalItemProperty/cbc:Name
    // /cac:Item/cac:AdditionalItemProperty/cbc:Value
    let applPrdCharacteristic = undefined
    const applPrdCharactEl = get1stElMissingOk(
      tradePrdEl,
      "cac:AdditionalItemProperty",
    )
    if (applPrdCharactEl) {
      const prdCharValue = get1stElTxt(applPrdCharactEl, "cbc:Value")
      const prdCharDescription = get1stElTxt(
        applPrdCharactEl,
        "cbc:Name",
      )
      applPrdCharacteristic = new invoiceDefs
        .ApplicableProductCharacteristic({
        description: prdCharDescription,
        value: prdCharValue,
      })
    }
    const globPrdId = new invoiceDefs.GlobalProductIdentifier(stdItemID, schemeID)
    const tradePrd = new invoiceDefs.TradeProduct({
      name: prdName,
      globalProductId: globPrdId,
      description: prdDescription,
      sellerAssignedId: prdSellerAssignedID,
      buyerAssignedId: prdBuyerAssignedID,
      applicableProductCharacteristic: applPrdCharacteristic,
    })

    /// ---------------------
    /// --- TradeDelivery ---
    // XRechung UBL standard
    // <cbc:InvoicedQuantity unitCode="EA">10</cbc:InvoicedQuantity>
    // <cbc:PackageQuantity unitCode="EA">10</cbc:PackageQuantity> (correct?)
    //
    // For comparision: The same code for ZUGFeRD:
    // <ram:SpecifiedLineTradeDelivery>
    //   <ram:BilledQuantity unitCode="XBC">15.0000</ram:BilledQuantity>
    //   <ram:PackageQuantity unitCode="XBO">20.0000</ram:PackageQuantity>
    // </ram:SpecifiedLineTradeDelivery>
    const billedQuantityTxt = get1stElTxt(invoiceLine, "cbc:InvoicedQuantity")
    const billedQuantityNum = parseFloat(billedQuantityTxt)
    const billedQuantityUnitCode = get1stElAttr(
      invoiceLine,
      "cbc:InvoicedQuantity",
      "unitCode",
    )
    const billedQuantity = new invoiceDefs.QuantityElement({
      unitCode: billedQuantityUnitCode,
      quantity: billedQuantityNum,
    })

    const packageQuantityTxt = get1stElTxtMissingOk(invoiceLine, "cbc:PackageQuantity")

    let packageQuantityNum = undefined
    let packageQuantityUnitCode = undefined
    if (packageQuantityTxt) {
      packageQuantityNum = parseFloat(<string> packageQuantityTxt)
      packageQuantityUnitCode = get1stElAttr(
        invoiceLine,
        "cbc:PackageQuantity",
        "unitCode",
      )
    }
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
