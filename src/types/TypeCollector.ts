import * as grammar from '../grammar';

import { Span } from '../position';
import { Scope, SymbolEntry } from '../symbols';
import { Diagnostic, Level, ErrorHandler } from '../diagnostic';

import { getType, getArrayContentType, isArrayType } from './collector-utils';

export class TypeCollector {
  private readonly scope: Scope;

  private readonly diagnostics: Diagnostic[] = [];

  constructor(scope: Scope) {
    this.scope = scope;
  }

  collect(): Diagnostic[] {
    try {
      this.handleScope(this.scope);
    } catch (err) {
      console.error(err);
    }

    return this.diagnostics;
  }

  handleScope(scope: Scope): void {
    scope.table.symbols.forEach(symbol => this.handleSymbol(symbol, scope));

    scope.scopes.forEach(nested => this.handleScope(nested));
  }

  handleSymbol(symbol: SymbolEntry, scope: Scope): void {
    switch (symbol.node.type) {
      case grammar.SyntacticToken.EMPTY_VARIABLE_DECL: {
        const decl = symbol.node as grammar.EmptyVariableDeclaration;
        symbol.setType(getType(this, decl.variableType, scope));
        break;
      }

      case grammar.SyntacticToken.VARIABLE_DECL: {
        const decl = symbol.node as grammar.VariableDeclaration;

        // If a variable type is given, use that, otherwise infer the type
        if (decl.variableType) {
          symbol.setType(getType(this, decl.variableType, scope));
        } else {
          symbol.setType(getType(this, decl.value, scope));
        }

        break;
      }

      case grammar.SyntacticToken.EMPTY_FUNCTION_DECL:
      case grammar.SyntacticToken.FUNCTION_DECL:
        break;

      // Statements
      case grammar.SyntacticToken.FOR_STMT: {
        const stmt = symbol.node as grammar.ForStatement;

        // If a variable type is given, use that, otherwise infer the type
        if (stmt.variableType) {
          symbol.setType(getType(this, stmt.variableType, scope));
        } else {
          const arrayType = getType(this, stmt.object, scope);

          if (isArrayType(arrayType, scope)) {
            symbol.setType(getArrayContentType(arrayType));
          }

          throw this.error('Can only loop over Array', stmt.object.span);
        }

        break;
      }

      default:
        break;
    }
  }

  error(msg: string, span: Span, errorHandler?: ErrorHandler): Error {
    const diagnostic = new Diagnostic(Level.ERROR, 'TypeChecker', msg, span);
    this.diagnostics.push(diagnostic);

    if (errorHandler) {
      errorHandler(diagnostic);
    }

    return new Error(msg);
  }
}
