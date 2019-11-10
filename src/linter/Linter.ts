import { LinterRule } from '.';
import { Scope } from '../symbols';
import { Node } from '../grammar';
import { ASTWalker } from '../walker';
import { Diagnostic } from '../diagnostic';

interface LinterRules {
  [name: string]: LinterRule;
}

export class Linter {
  private readonly ast: Node;

  private readonly rules: LinterRules;

  private readonly scope?: Scope;

  private readonly diagnostics: Diagnostic[] = [];

  constructor(astOrScope: Node | Scope, rules: LinterRules) {
    if (astOrScope instanceof Node) {
      this.ast = astOrScope;
    } else {
      this.ast = astOrScope.node;
      this.scope = astOrScope;
    }

    this.rules = rules;
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
