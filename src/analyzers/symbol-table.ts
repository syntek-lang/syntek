import { Token } from '../structures/token';
import Analyzer from '../structures/analyzer/Analyzer';
import AnalyzingContext from '../structures/analyzer/AnalyzingContext';

import Program from '../tokens/parsing/Program';
import { FunctionDeclaration } from '../tokens/parsing/declarations/FunctionDeclaration';
import { VariableDeclaration } from '../tokens/parsing/declarations/VariableDeclaration';
import { ClassDeclaration } from '../tokens/parsing/declarations/ClassDeclaration';
import { ImportDeclaration } from '../tokens/parsing/declarations/ImportDeclaration';
import { ObjectExpression } from '../tokens/parsing/expressions/ObjectExpression';

/**
 * Report a token already being declared
 *
 * @param token - The token that is trying to be declared
 * @param name - The name of the token
 * @param symbol - The symbol that is already declared
 * @param context - The context object
 */
function reportAlreadyDeclared(
  token: Token,
  name: string,
  symbol: Token,
  context: AnalyzingContext,
): void {
  switch (symbol.constructor) {
    case FunctionDeclaration:
      context.report({
        type: 'error',
        message: `The name '${name}' is already used by a function`,
        token,
      });
      break;

    case VariableDeclaration:
      context.report({
        type: 'error',
        message: `The name '${name}' is already used by a variable`,
        token,
      });
      break;

    case ClassDeclaration:
      context.report({
        type: 'error',
        message: `The name '${name}' is already used by a class`,
        token,
      });
      break;

    case ImportDeclaration:
      context.report({
        type: 'error',
        message: `The name '${name}' is already used by an import`,
        token,
      });
      break;

    default:
      context.report({
        type: 'warn',
        message: 'Something went wrong',
        token,
      });
  }
}

export default new Analyzer([
  {
    token: Program,
    exit(token, context) {
      console.log('Global scope', context.symbolTable.getSymbols(token));
      console.log('All declarations', context.symbolTable.symbols);
    },
  },
  {
    token: FunctionDeclaration,
    enter(token: FunctionDeclaration, context) {
      const scope = context.symbolTable.getScope(context.ancestors);

      // Check function name
      if (scope instanceof ClassDeclaration) {
        const alreadyDeclared = context.symbolTable
          .getSymbols(scope)
          .some(symbol => symbol.id === token.id);

        if (alreadyDeclared) {
          context.report({
            type: 'error',
            message: `The name ${token.id} is already used in the class`,
            token,
          });
        }
      } else {
        for (const symbol of context.symbolTable.getSymbols(token, context.ancestors)) {
          if (symbol.id === token.id) {
            reportAlreadyDeclared(token, token.id, symbol, context);
          }
        }
      }

      context.symbolTable.add(token, context.symbolTable.getScope(context.ancestors));

      // Check function parameters
      token.params.forEach((param) => {
        for (const symbol of context.symbolTable.getSymbols(token, context.ancestors)) {
          if (symbol.id === param.id.id) {
            reportAlreadyDeclared(param.id, param.id.id, symbol, context);
          }
        }

        context.symbolTable.add(param.id, token);
      });
    },
  },
  {
    token: VariableDeclaration,
    enter(token: VariableDeclaration, context) {
      const scope = context.symbolTable.getScope(context.ancestors);

      if (scope instanceof ClassDeclaration || scope instanceof ObjectExpression) {
        const alreadyDeclared = context.symbolTable
          .getSymbols(scope)
          .some(symbol => symbol.id === token.id);

        if (alreadyDeclared) {
          context.report({
            type: 'error',
            message: `The name '${token.id}' is already declared in the class/object`,
            token,
          });
        }

        context.symbolTable.add(token, scope);
      } else {
        const alreadyDeclared = context.symbolTable
          .getSymbols(token, context.ancestors)
          .some(symbol => symbol instanceof VariableDeclaration && symbol.id === token.id);

        if (!alreadyDeclared) {
          context.symbolTable.add(token, scope);
        }
      }
    },
  },
  {
    token: ClassDeclaration,
    enter(token: ClassDeclaration, context) {
      for (const symbol of context.symbolTable.getSymbols(token, context.ancestors)) {
        if (symbol.id === token.id) {
          reportAlreadyDeclared(token, token.id, symbol, context);
        }
      }

      context.symbolTable.add(token, context.symbolTable.getScope(context.ancestors));
    },
  },
  {
    token: ImportDeclaration,
    enter(token: ImportDeclaration, context) {
      for (const symbol of context.symbolTable.getSymbols(token, context.ancestors)) {
        if (symbol.id === token.id) {
          reportAlreadyDeclared(token, token.id, symbol, context);
        }
      }

      context.symbolTable.add(token, context.symbolTable.getScope(context.ancestors));
    },
  },
]);
