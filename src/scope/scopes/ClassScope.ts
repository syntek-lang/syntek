import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { SymbolTable } from '../symbols/SymbolTable';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class ClassScope extends Scope {
  private staticSymbols?: SymbolTable;

  getOwnStaticSymbol(name: string): SymbolEntry | undefined {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.staticSymbols!.get(name);
  }

  build(): void {
    this.staticSymbols = new SymbolTable();

    if (this.node.type === grammar.SyntacticToken.CLASS_DECL) {
      const decl = this.node as grammar.ClassDeclaration;

      decl.genericParams
        .forEach(generic => this.symbols.add(generic.lexeme, new SymbolEntry(decl, this)));

      decl.staticBody.forEach(prop => this.add(prop.value, this.staticSymbols));
      decl.instanceBody.forEach(prop => this.add(prop.value));
    } else {
      throw new Error(`Class scope can't contain node of type ${grammar.SyntacticToken[this.node.type]}`);
    }
  }
}
