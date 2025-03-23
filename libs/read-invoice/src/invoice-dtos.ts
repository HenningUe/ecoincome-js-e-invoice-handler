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

export interface TradeProductParams {
  name: string
  /** globalId = GTIN (Globale Artikelnummer/ Global article number) e.g. 4123456000014
   * Makes it possible to identify every item or service
   * worldwide without overlapping. It is not without reason that the GTIN (formerly EAN) is
   * retail trade (encoded as a barcode) and also serves as a leading product reference in online trade.
   * as the leading product reference.
   */
  globalId?: string
  /** schemeID = Global ID scheme identifier e.g. 0160
   * Available schemes: https://easyfirma.net/e-rechnung/xrechnung/codes
   */
  globalIdSchemeId?: string
  sellerAssignedId?: string
  buyerAssignedId?: string
  description?: string
  applicableProductCharacteristic?: ApplicableProductCharacteristic
}

export class TradeProduct {
  constructor(params: TradeProductParams) {
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
  unitCode?: string
  quantity?: number
}

export class QuantityElement {
  constructor(params: QuantityElementParams) {
    Object.assign(this, params)
  }
}
