import Analyzer from '../structures/analyzer/Analyzer';

import { Token, EquationToken } from '../structures/token';
import { VariableDeclaration } from '../tokens/parsing/declarations/VariableDeclaration';

import {
  BooleanKeyword, NumberKeyword, ObjectKeyword, StringKeyword,
} from '../tokens/lexing/keywords';
import { BooleanLiteral, NumberLiteral, StringLiteral } from '../tokens/lexing/literals';
import { ObjectExpression } from '../tokens/parsing/expressions/ObjectExpression';
import { ComparisonExpression } from '../tokens/parsing/expressions/ComparisonExpression';
import { LogicalExpression } from '../tokens/parsing/expressions/LogicalExpression';
import { NotExpression } from '../tokens/parsing/expressions/NotExpression';
import { ArrayExpression } from '../tokens/parsing/expressions/ArrayExpression';
import { ExpressionStatement } from '../tokens/parsing/expressions/ExpressionStatement';

function tokenResolvesToNumber(token: Token): boolean {
  return token instanceof NumberLiteral || token instanceof EquationToken;
}

function tokenResolvesToBoolean(token: Token): boolean {
  return token instanceof BooleanLiteral
    || token instanceof ComparisonExpression
    || token instanceof LogicalExpression
    || token instanceof NotExpression;
}

function isCorrectType(token: Token, type: Token) {
  switch (type.constructor) {
    case BooleanKeyword:
      return tokenResolvesToBoolean(token);

    case NumberKeyword:
      return tokenResolvesToNumber(token);

    case ObjectKeyword:
      return token instanceof ObjectExpression;

    case StringKeyword:
      return token instanceof StringLiteral;

    default:
      return true;
  }
}

export default new Analyzer([
  {
    token: VariableDeclaration,
    enter(token: VariableDeclaration, context) {
      if (!token.type) {
        return;
      }

      // TODO: Check if the return type is valid
      if (token.init instanceof ExpressionStatement) {
        return;
      }

      if (token.array) {
        if (!(token.init instanceof ArrayExpression)) {
          context.report({
            type: 'error',
            message: 'Variable type is array, but it is not declared with an array',
            token: token.init,
          });

          return;
        }

        for (const element of token.init.elements) {
          if (!isCorrectType(element, token.type)) {
            context.report({
              type: 'error',
              message: 'Array parameter is the wrong type',
              token: element,
            });
          }
        }

        return;
      }

      if (!isCorrectType(token.init, token.type)) {
        context.report({
          type: 'error',
          message: 'Variable is assigned with a wrong type',
          token,
        });
      }
    },
  },
]);
