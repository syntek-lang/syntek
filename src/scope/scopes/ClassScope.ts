import * as grammar from '../../grammar';

import { Scope } from './Scope';

export class ClassScope extends Scope {
  build(): void {
    if (this.node.type === grammar.SyntacticToken.CLASS_DECL) {
      const decl = this.node as grammar.ClassDeclaration;

      decl.staticBody.forEach(node => this.add(node));
      decl.instanceBody.forEach(node => this.add(node));
    } else {
      throw new Error(`Class scope can't contain node of type ${grammar.SyntacticToken[this.node.type]}`);
    }
  }
}
