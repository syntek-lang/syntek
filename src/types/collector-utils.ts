import * as grammar from '../grammar';
import { Scope, SymbolType } from '../symbols';

import { TypeCollector } from './TypeCollector';

type Func = grammar.FunctionDeclaration | grammar.EmptyFunctionDeclaration;

export function isArrayType(type: SymbolType | Func, scope: Scope): type is SymbolType {
  return type instanceof SymbolType && (type.type === scope.getSymbol('Array') || type.arrayDepth >= 1);
}

export function getArrayContentType(arrayType: SymbolType): SymbolType {
  // If there is arrayDepth, subtract one from it
  if (arrayType.arrayDepth >= 1) {
    return new SymbolType(arrayType.type, arrayType.generics, arrayType.arrayDepth - 1);
  }

  // Return the first generic argument
  return arrayType.generics[0];
}

export function getType(
  collector: TypeCollector,
  node: grammar.Node,
  scope: Scope,
): SymbolType | Func {
  switch (node.type) {
    // Expressions
    case grammar.SyntacticToken.WRAPPED_EXPR: {
      const expr = node as grammar.WrappedExpression;
      return getType(collector, expr.expression, scope);
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
      const arrayType = getType(collector, expr.object, scope);

      if (isArrayType(arrayType, scope)) {
        return getArrayContentType(arrayType);
      }

      throw collector.error('Can only get an index from an array', expr.span);
    }

    case grammar.SyntacticToken.MEMBER_EXPR:
    case grammar.SyntacticToken.NEW_EXPR:
      break;

    case grammar.SyntacticToken.INSTANCEOF_EXPR:
      return new SymbolType(scope.getSymbol('Boolean'));

    case grammar.SyntacticToken.ASYNC_EXPR: {
      const expr = node as grammar.AsyncExpression;
      const exprType = getType(collector, expr.expression, scope);

      if (exprType instanceof SymbolType) {
        return new SymbolType(scope.getSymbol('Promise'), [exprType], 0);
      }

      throw collector.error('Can not use async on a function', expr.span);
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

        const generics: SymbolType[] = [];
        variableType.generics.forEach((generic) => {
          const genericType = getType(collector, generic, scope);

          if (genericType instanceof SymbolType) {
            generics.push(genericType);
          }

          throw collector.error('Generic can not be a function', generic.span);
        });

        return new SymbolType(
          scope.getSymbol(identifier.lexeme),
          generics,
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
