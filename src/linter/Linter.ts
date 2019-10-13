import { LinterRule } from '.';
import { Scope } from '../scope';
import { Program } from '../grammar';
import { ASTWalker } from '../walker';
import { Diagnostic } from '../diagnostic';

interface LinterRules {
  [name: string]: LinterRule;
}

export class Linter {
  private readonly ast: Program;

  private readonly rules: LinterRules;

  private readonly scope?: Scope;

  private readonly diagnostics: Diagnostic[] = [];

  constructor(ast: Program, rules: LinterRules, scope?: Scope) {
    this.ast = ast;
    this.rules = rules;
    this.scope = scope;
  }

  lint(): Diagnostic[] {
    const walker = new ASTWalker(this.ast, this.scope);

    Object.entries(this.rules).forEach(([name, rule]) => {
      rule.create(walker, (msg, span, errorHandler) => {
        const error = new Diagnostic(rule.level, name, msg, span);

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
