import * as assert from "jsr:@std/assert"
import { Path } from "@e-invoice/pathlib-py2ts"
import { readInvoiceFromFileSync } from "../mod.ts"

function getTestRescDir(): Path {
  // @ts-ignore TS2345
  return new Path(<string> import.meta.filename).parent.join("resources/zugferd")
}

Deno.test("file content", () => {
  const fileName = "zugferd_2p3_EXTENDED_Warenrechnung.xml"
  const fileP = getTestRescDir().join(fileName)
  readInvoiceFromFileSync(fileP)
  assert.assert(true)
})

Deno.test("all readable", () => {
  getTestRescDir().globSync("**/*.xml").forEach((path) => {
    readInvoiceFromFileSync(path)
  })
})
