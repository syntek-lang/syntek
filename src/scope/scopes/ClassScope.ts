import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class ClassScope extends Scope {
  build(): void {
    if (this.node.type === grammar.SyntacticToken.CLASS_DECL) {
      const decl = this.node as grammar.ClassDeclaration;

      decl.genericParams
        .forEach(generic => this.symbols.add(generic.lexeme, new SymbolEntry(decl, this)));

      decl.body.forEach(prop => this.add(prop.value));
    } else {
      throw new Error(`Class scope can't contain node of type ${grammar.SyntacticToken[this.node.type]}`);
    }
  }
}
