import { SymbolEntry } from './SymbolEntry';
import { FunctionDeclaration, EmptyFunctionDeclaration } from '../../grammar';

type Func = FunctionDeclaration | EmptyFunctionDeclaration;

export class SymbolTable {
  readonly symbols = new Map<string, SymbolEntry>();

  readonly functions = new Map<string, Func[]>();

  readonly parent?: SymbolTable;

  constructor(parent?: SymbolTable) {
    this.parent = parent;
  }

  add(name: string, entry: SymbolEntry): void {
    if (!this.symbols.has(name)) {
      this.symbols.set(name, entry);
    }
  }

  addFunction(node: Func): void {
    const functions = this.functions.get(node.identifier.lexeme);

    if (functions) {
      functions.push(node);
    } else {
      this.functions.set(node.identifier.lexeme, [node]);
    }
  }
}
