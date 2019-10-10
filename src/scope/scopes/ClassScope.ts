import * as grammar from '../../grammar';

import { Scope } from './Scope';

export class ClassScope extends Scope {
  build(): void {
    if (this.node.type === grammar.SyntacticToken.CLASS_DECL) {
      const decl = this.node as grammar.ClassDeclaration;

      decl.body.forEach(prop => this.add(prop.value));
    } else {
      throw new Error(`Class scope can't contain node of type ${grammar.SyntacticToken[this.node.type]}`);
    }
  }
}
