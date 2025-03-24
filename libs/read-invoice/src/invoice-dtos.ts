export class Invoice {
  constructor(
    public tradeTransaction?: TradeTransaction,
  ) {}
}

export class TradeTransaction {
  constructor(
    public tradeLineItems?: TradeLineItem[],
  ) {
    if (tradeLineItems === undefined) {
      this.tradeLineItems = []
    }
  }
}

export class TradeLineItem {
  constructor(
    public tradeDelivery: TradeDelivery,
    public tradeProduct: TradeProduct,
  ) {}
}

export enum GlobalIdSchemeId {
  //(Global Trade Item Number)	Used in GS1 systems for product identification.
  GTIN = "0160",
  //(Dun & Bradstreet Number)	Identifies businesses globally.
  DUNS = "0002",
  //(European Article Number)	Older format of GTIN, still used in some cases.
  EAN = "0088",
  //(Verband der Automobilindustrie) Number	Used in the automotive industry.
  EuropeanVDA = "0130",
  //(International Location Number)	Identifies companies in supply chains.
  ILN = "0188",
  //(NATO Stock Number)	Used for military supply chain items.
  NATOStockNumber = "0204",
}

export class GlobalProductIdentifier {
  /**
   * Definition of the product identifier.
   * in xrechung ubl:
   * <cac:Item>
   *   <cbc:ID>1</cbc:ID>
   *   <cac:StandardItemIdentification>
   *     <cbc:ID schemeID="0160">GTIN</cbc:ID>
   *   </cac:StandardItemIdentification>
   * </cac:Item>
   *
   * in zugferd:
   * <ram:SpecifiedTradeProduct>
   *   <ram:GlobalID schemeID="0160">GTIN</ram:GlobalID>
   * </ram:SpecifiedTradeProduct>
   * @param id - The identifier of the product.
   * id = GTIN (Globale Artikelnummer/ Global article number) e.g. 4123456000014
   * Makes it possible to identify every item or service
   * worldwide without overlapping. It is not without reason that the GTIN (formerly EAN) is
   * retail trade (encoded as a barcode) and also serves as a leading product reference in online trade.
   * as the leading product reference.
   * @param schemeId - The scheme identifier of the product.
   * schemeID = Global ID scheme identifier e.g. 0160
   * Available schemes: https://easyfirma.net/e-rechnung/xrechnung/codes
   */
  constructor(
    public id?: string,
    public schemeId?: string,
  ) {}

  public get getGlobalIdSchemeId(): GlobalIdSchemeId {
    return this.schemeId as GlobalIdSchemeId
  }
}

export interface TradeProductParams {
  name: string
  globalProductId?: GlobalProductIdentifier
  sellerAssignedId?: string
  buyerAssignedId?: string
  description?: string
  applicableProductCharacteristic?: ApplicableProductCharacteristic
}

export class TradeProduct implements TradeProductParams {
  // Product name
  name: string
  // Product description
  description?: string | undefined
  // Globally harmonized Product identification number
  globalProductId?: GlobalProductIdentifier | undefined
  // Proprietary Product identification number of seller
  sellerAssignedId?: string | undefined
  // Proprietary Product identification number of buyer
  buyerAssignedId?: string | undefined
  applicableProductCharacteristic?: ApplicableProductCharacteristic | undefined

  constructor(params: TradeProductParams) {
    this.name = params.name
    Object.assign(this, params)
  }
}

export interface ApplicableProductCharacteristicParams {
  description: string
  value: string
}

export class ApplicableProductCharacteristic {
  constructor(params: ApplicableProductCharacteristicParams) {
    Object.assign(this, params)
  }
}

export class TradeDelivery {
  /**
   * Definition of the quantity of the delivered product.
   * @param billedQuantity - The quantity of the product that is billed.
   * @param packageQuantity - The quantity of the product that is packaged.
   */
  constructor(
    public billedQuantity: QuantityElement,
    public packageQuantity: QuantityElement,
  ) {}
}

export interface QuantityElementParams {
  //Standarized code of unit
  //see https://www.truugo.com/ubl/2.1/cl_unitofmeasure/
  unitCode?: string
  quantity?: number
}

export class QuantityElement implements QuantityElementParams {
  constructor(params: QuantityElementParams) {
    Object.assign(this, params)
  }
}
