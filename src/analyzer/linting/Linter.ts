import { BlockScope } from '..';
import { Program } from '../../grammar';
import { ASTWalker } from '../../walker';
import { Diagnostic } from '../../diagnostic';

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
      rule.create(walker, (msg, span, errorHandler) => {
        const error = new Diagnostic(rule.level, msg, span);

        if (errorHandler) {
          errorHandler(error);
        }

        this.diagnostics.push(error);
      });
    });

    walker.walk();
    return this.diagnostics;
  }
}
