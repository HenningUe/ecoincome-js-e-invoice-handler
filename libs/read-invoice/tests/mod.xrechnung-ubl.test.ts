import * as assert from "jsr:@std/assert"
import { Path } from "@e-invoice/pathlib-py2ts"
import { readInvoiceFromFileSync } from "../mod.ts"

function getTestRescDir(): Path {
  // @ts-ignore TS2345
  return new Path(<string> import.meta.filename).parent.join("resources/xrechnung-ubl")
}

Deno.test("file content", () => {
  const fileName = "03.06a-INVOICE_ubl.xml"
  const fileP = getTestRescDir().join(fileName)
  readInvoiceFromFileSync(fileP)
  assert.assert(true)
})

Deno.test("all readable", () => {
  getTestRescDir().globSync("**/*.xml").forEach((path) => {
    readInvoiceFromFileSync(path)
  })
})

// describe("readSingleTradeLineItem", () => {
//    Successfully creates and returns a TradeLineItem with valid trade product and delivery data
//   it("should create and return a TradeLineItem with valid trade product and delivery data", () => {
//     Arrange
//     const mockNode = {} as Node
//     const reader = new TradeLineItemReader(mockNode)

//     const mockTradeProduct = new invoiceDefs.TradeProduct({
//       name: "Test Product",
//       globalProductId: new invoiceDefs.GlobalProductIdentifier("123", "EAN"),
//       description: "Test Description",
//       sellerAssignedId: "S123",
//       buyerAssignedId: "B123",
//       applicableProductCharacteristic: new invoiceDefs.ApplicableProductCharacteristic({
//         description: "Color",
//         value: "Blue",
//       }),
//     })

//     const mockTradeDelivery = new invoiceDefs.TradeDelivery(
//       new invoiceDefs.QuantityElement({ unitCode: "EA", quantity: 10 }),
//       new invoiceDefs.QuantityElement({ unitCode: "PK", quantity: 2 }),
//     )

//     jest.spyOn(reader, "readTradeProduct").mockReturnValue(mockTradeProduct)
//     jest.spyOn(reader, "readTradeDelivery").mockReturnValue(mockTradeDelivery)

//     const result = reader.readSingleTradeLineItem()

//     // Assert
//     expect(result).toBeInstanceOf(invoiceDefs.TradeLineItem)
//     expect(result.tradeDelivery).toBe(mockTradeDelivery)
//     expect(result.tradeProduct).toBe(mockTradeProduct)
//     expect(reader.readTradeProduct).toHaveBeenCalledTimes(1)
//     expect(reader.readTradeDelivery).toHaveBeenCalledTimes(1)
//   })

//   // Handles when readTradeProduct() returns minimal valid product data
//   it("should create a TradeLineItem with minimal valid product data", () => {
//     // Arrange
//     const mockNode = {} as Node
//     const reader = new TradeLineItemReader(mockNode)

//     const minimalTradeProduct = new invoiceDefs.TradeProduct({
//       name: "Minimal Product",
//       globalProductId: new invoiceDefs.GlobalProductIdentifier(undefined, undefined),
//       description: undefined,
//       sellerAssignedId: undefined,
//       buyerAssignedId: undefined,
//       applicableProductCharacteristic: undefined,
//     })

//     const mockTradeDelivery = new invoiceDefs.TradeDelivery(
//       new invoiceDefs.QuantityElement({ unitCode: "EA", quantity: 5 }),
//       new invoiceDefs.QuantityElement({ unitCode: undefined, quantity: undefined }),
//     )

//     jest.spyOn(reader, "readTradeProduct").mockReturnValue(minimalTradeProduct)
//     jest.spyOn(reader, "readTradeDelivery").mockReturnValue(mockTradeDelivery)

//     // Act
//     const result = reader.readSingleTradeLineItem()

//     // Assert
//     expect(result).toBeInstanceOf(invoiceDefs.TradeLineItem)
//     expect(result.tradeProduct).toBe(minimalTradeProduct)
//     expect(result.tradeProduct.name).toBe("Minimal Product")
//     expect(result.tradeProduct.description).toBeUndefined()
//     expect(result.tradeProduct.applicableProductCharacteristic).toBeUndefined()
//     expect(result.tradeDelivery).toBe(mockTradeDelivery)
//     expect(result.tradeDelivery.billedQuantity.quantity).toBe(5)
//     expect(result.tradeDelivery.packageQuantity.quantity).toBeUndefined()
//   })
// })
