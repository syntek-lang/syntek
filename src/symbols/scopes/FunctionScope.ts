import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { SymbolEntry } from '../symbols/SymbolEntry';

type Func = grammar.FunctionDeclaration | grammar.EmptyFunctionDeclaration;

export class FunctionScope extends Scope<Func> {
  build(): void {
    this.node.genericParams.forEach((generic) => {
      this.table.add(generic.identifier.lexeme, new SymbolEntry(generic, this));
    });

    this.node.params.forEach(param => this.add(param));

    if (this.node.type === grammar.SyntacticToken.FUNCTION_DECL) {
      (this.node as grammar.FunctionDeclaration).body.forEach(node => this.add(node));
    }
  }
}
