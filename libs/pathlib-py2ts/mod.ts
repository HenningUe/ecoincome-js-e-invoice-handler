import * as pathlib from "@std/path"
import * as fs from "@std/fs"
import { glob, globSync } from "glob"

export class Path {
  itemPath: string

  constructor(itemPath: Path | string, ...paths: string[]) {
    if (itemPath instanceof Path) itemPath = itemPath.itemPath
    this.itemPath = pathlib.resolve(pathlib.join(itemPath, ...paths))
  }


  /**
   * Get absolute path
   */
  get absolute(): string {
    return pathlib.normalize(pathlib.resolve(this.itemPath))
  }

  /**
   * Get absolute path
   */
  get path(): string {
    return this.absolute
  }

  /**
   * Get parent directory
   */
  get parent(): Path {
    return new Path(pathlib.dirname(this.itemPath))
  }

  // Check if path exists
  get exists(): boolean {
    return fs.existsSync(this.itemPath)
  }

  // Check if it's a file
  get isFile(): boolean {
    return fs.existsSync(this.itemPath) && Deno.statSync(this.itemPath).isFile
  }

  // Check if it's a directory
  get isDirectory(): boolean {
    return fs.existsSync(this.itemPath) &&
      Deno.statSync(this.itemPath).isDirectory
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
      parts = [root, ...this.itemPath.split(pathlib.SEPARATOR).slice(1)]
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

  get asURI(): string {
    return `file://${this.itemPath.replace(pathlib.SEPARATOR, "/")}`
  }

  get isAbsolute(): boolean {
    return pathlib.isAbsolute(this.itemPath)
  }

  get isRelative(): boolean {
    return !this.isAbsolute
  }

  globSync(pattern: string | string[]): Path[] {
    return globSync(pattern, { withFileTypes: false }).map((path) => new Path(path))
  }

  async glob(pattern: string | string[]): Promise<Path[]> {
    const itemsPromise = glob(pattern, { withFileTypes: false })
    const results = await itemsPromise.then((files) =>
      Promise.all(files.map((path) => new Path(path)))
    )
    return results
  }

  // Join paths
  join(...paths: string[]): Path {
    return new Path(pathlib.join(this.itemPath, ...paths))
  }

  // Read file content
  readTextSync(encoding: string = "utf-8"): string {
    if (!this.isFile) throw new Error(`Not a file: ${this.itemPath}`)
    const data = Deno.readFileSync(this.path)
    return new TextDecoder(encoding).decode(data)
  }

  // Read file content
  async readText(encoding: string = "utf-8"): Promise<string> {
    let data: Uint8Array
    if (typeof Deno !== "undefined") {
      data = await Deno.readFile(this.itemPath)
    } else {
      throw new Error("Not implemented")
    }
    return new TextDecoder(encoding).decode(data)
  }

  // Write text to file
  writeTextSync(content: string): void {
    if (!this.isFile) throw new Error(`Not a file: ${this.itemPath}`)
    Deno.writeTextFileSync(this.itemPath, content)
  }

  // Delete file
  delete(): void {
    if (this.isFile) {
      Deno.removeSync(this.itemPath)
    } else if (this.isDirectory) {
      Deno.removeSync(this.itemPath, { recursive: true })
    }
  }

  relativeTo(other: Path | string): Path {
    if (other instanceof Path) {
      other = other.itemPath
    }
    if (!`${this}`.startsWith(`${other}`)) {
      throw Error(`'${this}' does not start with '${other}'`)
    }
    let relativePath = this.itemPath.substring(`${other}`.length)
    if (
      relativePath.startsWith(pathlib.SEPARATOR) &&
      relativePath !== pathlib.SEPARATOR
    ) {
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
    parts[parts.length - 1] = `${stem}${parts[parts.length - 1].substring(this.stem.length)}`
    return new Path(parts.join(pathlib.SEPARATOR))
  }

  withSuffix(value: string) {
    if (value !== "" && !/\.[a-zA-Z0-9]+/.test(value)) {
      throw Error(`Invalid suffix '${value}'`)
    }
    if (this.root === this.itemPath) {
      throw Error(`Path('${this.root}') has an empty suffix`)
    }
    return new Path(
      `${this.itemPath.substring(0, this.itemPath.length - this.suffix.length)}${value}`,
    )
  }

  toString(): string {
    return this.absolute
  }
}
