import { Token } from '../../grammar';
import { SymbolEntry } from './SymbolEntry';

export class SymbolTable {
  readonly symbols = new Map<string, SymbolEntry>();

  readonly parent?: SymbolTable;

  constructor(parent?: SymbolTable) {
    this.parent = parent;
  }

  add(token: Token, entry: SymbolEntry): void {
    const name = token.lexeme;

    if (!this.symbols.has(name)) {
      this.symbols.set(name, entry);
    }
  }
}
