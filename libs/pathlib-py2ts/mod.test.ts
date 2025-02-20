import * as assert from "jsr:@std/assert"
import { Path } from "./mod.ts"

function getMyFile(): Path {
  // @ts-ignore TS2345
  return new Path(import.meta.filename)
}

function getMyDir(): Path {
  // @ts-ignore TS2345
  return new Path(import.meta.filename).parent
}

Deno.test("file exists", () => {
  const exists = getMyFile().isFile
  assert.assert(exists)
})

Deno.test("dir exists", () => {
  const exists = getMyFile().parent.isDirectory
  assert.assert(exists)
})

Deno.test("dir name", () => {
  assert.assertEquals(getMyFile().parent.name, "pathlib-py2ts")
})

Deno.test("async read", async () => {
  const txt = await getMyDir().join("deno.jsonc").readText()
  assert.assertGreater(txt.length, 100)
})
