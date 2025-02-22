import pathlib from "node:path"
import * as fs from "node:fs"

export class Path {
  itemPath: string

  constructor(itemPath: Path | string, ...paths: string[]) {
    if (itemPath instanceof Path) itemPath = itemPath.itemPath
    this.itemPath = pathlib.resolve(pathlib.join(itemPath, ...paths))
  }

  // Get absolute path
  get absolute(): string {
    return pathlib.normalize(pathlib.resolve(this.itemPath))
  }

  // Get parent directory
  get parent(): Path {
    return new Path(pathlib.dirname(this.itemPath))
  }

  // Join paths
  join(...paths: string[]): Path {
    return new Path(pathlib.join(this.itemPath, ...paths))
  }

  // Check if path exists
  exists(): boolean {
    return fs.existsSync(this.itemPath)
  }

  // Check if it's a file
  isFile(): boolean {
    return fs.existsSync(this.itemPath) && fs.statSync(this.itemPath).isFile()
  }

  // Check if it's a directory
  isDirectory(): boolean {
    return fs.existsSync(this.itemPath) &&
      fs.statSync(this.itemPath).isDirectory()
  }

  // Read file content
  readTextSync(encoding: string = "utf-8"): string {
    if (!this.isFile()) throw new Error("Not a file")
    return fs.readFileSync(this.itemPath, encoding)
  }

  // Read file content
  async readText(encoding: string = "utf-8"): Promise<string> {
    let data: Uint8Array
    if (typeof Deno !== "undefined") {
      // Deno environment
      data = await Deno.readFile(this.itemPath)
    } else {
      // Node.js environment
      const { promises: fs } = await import("fs") // Dynamic import for Node.js
      data = new Uint8Array(await fs.readFile(this.itemPath))
    }
    return new TextDecoder(encoding).decode(data)
  }

  // Write text to file
  writeTextSync(content: string, encoding: string = "utf-8"): void {
    fs.writeFileSync(this.itemPath, content, encoding)
  }

  // Delete file
  delete(): void {
    if (this.isFile()) {
      fs.unlinkSync(this.itemPath)
    } else if (this.isDirectory()) {
      fs.rmdirSync(this.itemPath, { recursive: true })
    }
  }

  get name(): string {
    return pathlib.basename(this.itemPath)
  }

  get parts(): string[] {
    let parts: string[]
    const root = this.root
    if (root === this.itemPath) {
      parts = [root]
    } else {
      parts = [root, ...this.itemPath.split(pathlib.sep).slice(1)]
    }
    return parts
  }

  get root(): string {
    return pathlib.parse(this.itemPath).root
  }

  get stem(): string {
    const name = this.name
    if (name.includes(".")) {
      const splits = name.split(".")
      if (name.startsWith(".")) {
        return [`.${splits[1]}`, ...splits.slice(2, -1)].join(".")
      } else {
        return splits.slice(0, -1).join(".")
      }
    }
    return name
  }

  get suffix(): string {
    const suffixes = this.suffixes
    return suffixes.length ? suffixes[suffixes.length - 1] : ""
  }

  get suffixes(): string[] {
    const parts = this.parts
    const last = parts[parts.length - 1].startsWith(".")
      ? parts[parts.length - 1].substring(1)
      : parts[parts.length - 1]
    if (!last.includes(".")) {
      return []
    }
    return last
      .split(".")
      .slice(1)
      .map((s) => `.${s}`)
  }

  asURI(): string {
    return `file://${this.itemPath.replace(pathlib.sep, "/")}`
  }

  isAbsolute(): boolean {
    return pathlib.isAbsolute(this.itemPath)
  }

  relativeTo(other: Path | string): Path {
    if (other instanceof Path) {
      other = other.itemPath
    }
    if (!`${this}`.startsWith(`${other}`)) {
      throw Error(`'${this}' does not start with '${other}'`)
    }
    let relativePath = this.itemPath.substring(`${other}`.length)
    if (relativePath.startsWith(pathlib.sep) && relativePath !== pathlib.sep) {
      relativePath = relativePath.substring(1)
    }
    return new Path(relativePath)
  }

  withName(name: string) {
    if (this.root === this.itemPath) {
      throw Error(`Path('${this.root}') has an empty name`)
    }
    const parts = this.parts.slice(0, -1)
    return new Path(pathlib.join(...parts, name))
  }

  withStem(stem: string) {
    if (this.root === this.itemPath) {
      throw Error(`Path('${this.root}') has an empty stem`)
    }
    const parts = this.parts
    parts[parts.length - 1] = `${stem}${
      parts[parts.length - 1].substring(this.stem.length)
    }`
    return new Path(parts.join(pathlib.sep))
  }

  withSuffix(value: string) {
    if (value !== "" && !/\.[a-zA-Z0-9]+/.test(value)) {
      throw Error(`Invalid suffix '${value}'`)
    }
    if (this.root === this.itemPath) {
      throw Error(`Path('${this.root}') has an empty suffix`)
    }
    return new Path(
      `${
        this.itemPath.substring(0, this.itemPath.length - this.suffix.length)
      }${value}`,
    )
  }

  // Convert to string
  toString(): string {
    return this.absolute
  }
}
