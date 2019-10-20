import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { SymbolTable } from '../symbols/SymbolTable';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class ClassScope extends Scope {
  private readonly staticSymbols = new SymbolTable();

  getOwnStaticSymbol(name: string): SymbolEntry | undefined {
    return this.staticSymbols.get(name);
  }

  build(): void {
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
