import * as grammar from '../grammar';

import { Span } from '../position';
import { Type } from './types/Type';
import { Scope, SymbolEntry } from '../symbols';
import { Diagnostic, Level, ErrorHandler } from '../diagnostic';

import { typeCheckRules } from './type-check-rules';

export class TypeChecker {
  readonly scope: Scope;

  private readonly diagnostics: Diagnostic[] = [];

  constructor(scope: Scope) {
    this.scope = scope;
  }

  check(): Diagnostic[] {
    try {
      this.handleScope(this.scope);
    } catch (err) {
      console.error(err);
    }

    return this.diagnostics;
  }

  handleScope(scope: Scope): void {
    scope.table.symbols.forEach(symbol => this.handleSymbol(symbol));
    scope.scopes.forEach(nested => this.handleScope(nested));
  }

  handleSymbol(symbol: SymbolEntry): void {
    symbol.setType(this.getType(symbol.node));
  }

  getType(node: grammar.Node): Type {
    return typeCheckRules[node.type](node, this);
  }

  error(msg: string, span: Span, errorHandler?: ErrorHandler): void {
    const diagnostic = new Diagnostic(Level.ERROR, 'TypeChecker', msg, span);
    this.diagnostics.push(diagnostic);

    if (errorHandler) {
      errorHandler(diagnostic);
    }
  }
}
