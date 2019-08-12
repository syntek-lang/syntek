import { BlockScope } from '../..';
import { Program } from '../../../grammar';
import { ASTWalker } from '../../../walker';
import { Diagnostic } from '../../../diagnostic';

import * as rules from './rules';

const rulesArray = Object.values(rules);

export class Linter {
  readonly ast: Program;

  readonly scope: BlockScope;

  readonly diagnostics: Diagnostic[] = [];

  constructor(ast: Program) {
    this.ast = ast;
    this.scope = new BlockScope(ast);
  }

  lint(): Diagnostic[] {
    this.scope.build();
    const walker = new ASTWalker(this.ast, this.scope);

    rulesArray.forEach((rule) => {
      rule.create(walker, (span, msg) => {
        this.diagnostics.push(new Diagnostic(rule.level, msg, span));
      });
    });

    walker.walk();
    return this.diagnostics;
  }
}
