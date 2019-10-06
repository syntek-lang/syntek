import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class FunctionScope extends Scope {
  build(): void {
    if (this.node.type === grammar.SyntacticToken.FUNCTION_DECL) {
      const decl = this.node as grammar.FunctionDeclaration;

      decl.genericParams.forEach(generic => this.symbols.add(generic, new SymbolEntry(decl, this)));

      decl.params.forEach(param => this.add(param));
      decl.body.forEach(node => this.add(node));
    } else {
      throw new Error(`Function scope can't contain node of type ${grammar.SyntacticToken[this.node.type]}`);
    }
  }
}
