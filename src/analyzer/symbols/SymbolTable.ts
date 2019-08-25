import { SymbolEntry } from '..';

export class SymbolTable {
  private readonly symbols = new Map<string, SymbolEntry>();

  private readonly parent?: SymbolTable;

  constructor(parent?: SymbolTable) {
    this.parent = parent;
  }

  set(name: string, symbol: SymbolEntry): SymbolTable {
    if (this.has(name)) {
      throw new Error(`Symbol with name ${name} already exists`);
    }

    this.symbols.set(name, symbol);
    return this;
  }

  get(name: string): SymbolEntry | undefined {
    if (this.hasOwn(name)) {
      return this.symbols.get(name);
    }

    if (this.parent) {
      return this.parent.get(name);
    }

    return undefined;
  }

  has(name: string): boolean {
    if (this.hasOwn(name)) {
      return true;
    }

    if (this.parent) {
      return this.parent.has(name);
    }

    return false;
  }

  hasOwn(name: string): boolean {
    return this.symbols.has(name);
  }
}
