import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { GlobalScope } from './GlobalScope';

export class ProgramScope extends Scope {
  private static readonly globalScope = new GlobalScope();

  constructor(node: grammar.Node) {
    super(node, ProgramScope.globalScope);
  }

  build(): void {
    if (this.node.type === grammar.SyntacticToken.PROGRAM) {
      const program = this.node as grammar.Program;

      program.body.forEach(node => this.add(node));
    } else {
      throw new Error(`Program scope can't contain node of type ${grammar.SyntacticToken[this.node.type]}`);
    }
  }
}
