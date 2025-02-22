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
  globalId?: string
  schemeId?: string
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
  constructor(
    public billedQuantity: QuantityElement,
    public packageQuantity: QuantityElement,
  ) {}
}

export interface QuantityElementParams {
  unitCode: string
  quantity: number
}

export class QuantityElement {
  constructor(params: QuantityElementParams) {
    Object.assign(this, params)
  }
}
