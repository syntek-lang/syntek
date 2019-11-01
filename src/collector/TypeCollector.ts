import * as grammar from '../grammar';
import {
  Scope, SymbolEntry,
  getArrayContentType, getType,
} from '../scope';

export class TypeCollector {
  private readonly scope: Scope;

  constructor(scope: Scope) {
    this.scope = scope;
  }

  collect(): void {
    this.handleScope(this.scope);
  }

  private handleScope(scope: Scope): void {
    scope.table.symbols.forEach(symbol => this.handleSymbol(symbol, scope));
    scope.scopes.forEach(nested => this.handleScope(nested));
  }

  private handleSymbol(symbol: SymbolEntry, scope: Scope): void {
    switch (symbol.node.type) {
      // Declarations
      case grammar.SyntacticToken.EMPTY_VARIABLE_DECL: {
        const decl = symbol.node as grammar.EmptyVariableDeclaration;
        symbol.setType(getType(decl.variableType, scope));
        break;
      }

      case grammar.SyntacticToken.VARIABLE_DECL: {
        const decl = symbol.node as grammar.VariableDeclaration;

        // If a variable type is given, use that, otherwise infer the type
        if (decl.variableType) {
          symbol.setType(getType(decl.variableType, scope));
        } else {
          symbol.setType(getType(decl.value, scope));
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
          symbol.setType(getType(stmt.variableType, scope));
        } else {
          const arrayType = getType(stmt.object, scope);
          symbol.setType(getArrayContentType(arrayType, scope));
        }

        break;
      }

      default:
        break;
    }
  }
}
