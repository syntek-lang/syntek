import { LinterRule } from '.';
import { Program } from '../grammar';
import { ASTWalker } from '../walker';
import { BlockScope } from '../analyzer';
import { Diagnostic } from '../diagnostic';

interface LinterRules {
  [name: string]: LinterRule;
}

export class Linter {
  private readonly ast: Program;

  private readonly rules: LinterRules;

  private readonly scope: BlockScope;

  private readonly diagnostics: Diagnostic[] = [];

  constructor(ast: Program, rules: LinterRules) {
    this.ast = ast;
    this.rules = rules;

    this.scope = new BlockScope(ast);
  }

  lint(): Diagnostic[] {
    this.scope.build();
    const walker = new ASTWalker(this.ast, this.scope);

    Object.entries(this.rules).forEach(([name, rule]) => {
      rule.create(walker, (msg, span, errorHandler) => {
        const error = new Diagnostic(rule.level, `${name}: ${msg}`, span);

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
