import Analyzer from '../structures/analyzer/Analyzer';
import SymbolTable from '../structures/analyzer/SymbolTable';

import Program from '../tokens/parsing/Program';
import { FunctionDeclaration } from '../tokens/parsing/declarations/FunctionDeclaration';
import { VariableDeclaration } from '../tokens/parsing/declarations/VariableDeclaration';
import { ClassDeclaration } from '../tokens/parsing/declarations/ClassDeclaration';
import { ImportDeclaration } from '../tokens/parsing/declarations/ImportDeclaration';

const symbolTable: SymbolTable = new SymbolTable();

export default new Analyzer([
  {
    token: Program,
    exit(token) {
      console.log('Global scope', symbolTable.getSymbols(token));
      console.log('All declarations', symbolTable.symbols);
    },
  },
  {
    token: FunctionDeclaration,
    enter(token: FunctionDeclaration, context) {
      const symbols = symbolTable.getSymbols(token, context.ancestors);

      // TODO: Move this logic to a different analyzer
      for (const symbol of symbols) {
        if (symbol.id === token.id) {
          switch (symbol.constructor) {
            case FunctionDeclaration:
              context.report({
                type: 'error',
                message: `The name '${token.id}' is already used by a function`,
                token,
              });
              break;

            case VariableDeclaration:
              context.report({
                type: 'error',
                message: `The name '${token.id}' is already used by a variable`,
                token,
              });
              break;

            case ClassDeclaration:
              context.report({
                type: 'error',
                message: `The name '${token.id}' is already used by a class`,
                token,
              });
              break;

            case ImportDeclaration:
              context.report({
                type: 'error',
                message: `The name '${token.id}' is already used by an import`,
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
      }

      symbolTable.add(token, symbolTable.getScope(context.ancestors));
      token.params.forEach((param) => {
        // TODO: Check whether param.id is already declared in the scope

        symbolTable.add(param.id, token);
      });
    },
  },
  {
    token: VariableDeclaration,
    enter(token: VariableDeclaration, context) {
      // TODO: Do name checks

      symbolTable.add(token, symbolTable.getScope(context.ancestors));
    },
  },
  {
    token: ClassDeclaration,
    enter(token: ClassDeclaration, context) {
      // TODO: Do name checks

      symbolTable.add(token, symbolTable.getScope(context.ancestors));
    },
  },
  {
    token: ImportDeclaration,
    enter(token: ImportDeclaration, context) {
      // TODO: Do name checks

      symbolTable.add(token, symbolTable.getScope(context.ancestors));
    },
  },
]);
