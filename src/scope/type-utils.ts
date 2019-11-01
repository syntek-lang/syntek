import * as grammar from '../grammar';

import { Scope } from './scopes/Scope';
import { SymbolType } from './symbols/SymbolType';

export function getArrayContentType(arrayType: SymbolType, scope: Scope): SymbolType {
  if (arrayType.type !== scope.getSymbol('Array') && arrayType.arrayDepth === 0) {
    throw new Error('Can only get index of an array');
  }

  // If there is arrayDepth, subtract one from it
  if (arrayType.arrayDepth >= 1) {
    return new SymbolType(arrayType.type, arrayType.generics, arrayType.arrayDepth - 1);
  }

  // Return the first generic argument
  return arrayType.generics[0];
}

export function getType(node: grammar.Node, scope: Scope): SymbolType {
  switch (node.type) {
    // Expressions
    case grammar.SyntacticToken.WRAPPED_EXPR: {
      const expr = node as grammar.WrappedExpression;
      return getType(expr.expression, scope);
    }

    case grammar.SyntacticToken.UNARY_EXPR: {
      const expr = node as grammar.UnaryExpression;

      if (expr.operator.type === grammar.LexicalToken.MINUS) {
        return new SymbolType(scope.getSymbol('Number'));
      }

      return new SymbolType(scope.getSymbol('Boolean'));
    }

    case grammar.SyntacticToken.BINARY_EXPR: {
      const expr = node as grammar.BinaryExpression;

      switch (expr.operator.type) {
        case grammar.LexicalToken.EQUAL_EQUAL:
        case grammar.LexicalToken.BANG_EQUAL:
        case grammar.LexicalToken.LT:
        case grammar.LexicalToken.GT:
        case grammar.LexicalToken.LT_EQUAL:
        case grammar.LexicalToken.GT_EQUAL:
        case grammar.LexicalToken.AND:
        case grammar.LexicalToken.OR:
          return new SymbolType(scope.getSymbol('Boolean'));

        default:
          return new SymbolType(scope.getSymbol('Number'));
      }
    }

    case grammar.SyntacticToken.CALL_EXPR:
      break;

    case grammar.SyntacticToken.INDEX_EXPR: {
      const expr = node as grammar.IndexExpression;
      const arrayType = getType(expr.object, scope);
      return getArrayContentType(arrayType, scope);
    }

    case grammar.SyntacticToken.MEMBER_EXPR:
    case grammar.SyntacticToken.NEW_EXPR:
      break;

    case grammar.SyntacticToken.INSTANCEOF_EXPR:
      return new SymbolType(scope.getSymbol('Boolean'));

    case grammar.SyntacticToken.ASYNC_EXPR: {
      const expr = node as grammar.AsyncExpression;
      return new SymbolType(scope.getSymbol('Promise'), [getType(expr.expression, scope)], 0);
    }

    case grammar.SyntacticToken.ARRAY_EXPR: {
      // TODO: get highest type of array content
      // const expr = node as grammar.ArrayExpression;
      return new SymbolType(scope.getSymbol('Array'), [new SymbolType(scope.getSymbol('Object'))], 0);
    }

    case grammar.SyntacticToken.IF_EXPR:
    case grammar.SyntacticToken.ELSE_EXPR:
      break;

    case grammar.SyntacticToken.IDENTIFIER: {
      const expr = node as grammar.Identifier;
      return scope.getSymbol(expr.lexeme).getType();
    }

    case grammar.SyntacticToken.NUMBER_LITERAL:
      return new SymbolType(scope.getSymbol('Number'));

    case grammar.SyntacticToken.STRING_LITERAL:
      return new SymbolType(scope.getSymbol('String'));

    case grammar.SyntacticToken.BOOLEAN_LITERAL:
      return new SymbolType(scope.getSymbol('Boolean'));

    // Other
    case grammar.SyntacticToken.VARIABLE_TYPE: {
      const variableType = node as grammar.VariableType;

      if (variableType.object.type === grammar.SyntacticToken.IDENTIFIER) {
        const identifier = variableType.object as grammar.Identifier;

        return new SymbolType(
          scope.getSymbol(identifier.lexeme),
          variableType.generics.map(generic => getType(generic, scope)),
          variableType.arrayDepth,
        );
      }

      throw new Error('Member expression not yet supported');
    }

    default:
      break;
  }

  throw new Error(`Can't handle node of type ${grammar.SyntacticToken[node.type]}`);
}
