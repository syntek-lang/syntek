import { LinterRule } from '.';
import { Program } from '../grammar';
import { ASTWalker } from '../walker';
import { BlockScope } from '../analyzer';
import { Diagnostic } from '../diagnostic';

export class Linter {
  private readonly ast: Program;

  private readonly rules: LinterRule[];

  private readonly scope: BlockScope;

  private readonly diagnostics: Diagnostic[] = [];

  constructor(ast: Program, rules: LinterRule[]) {
    this.ast = ast;
    this.rules = rules;

    this.scope = new BlockScope(ast);
  }

  lint(): Diagnostic[] {
    this.scope.build();
    const walker = new ASTWalker(this.ast, this.scope);

    this.rules.forEach((rule) => {
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
