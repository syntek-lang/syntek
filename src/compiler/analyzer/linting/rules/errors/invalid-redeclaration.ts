import * as grammar from '../../../../../grammar';

import { LintingRule } from '../..';
import { Level } from '../../../../../diagnostic';

export const invalidRedeclaration: LintingRule = {
  name: 'invalid-redeclaration',
  description: 'Report invalid redeclarations',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.VariableDeclaration, (node, scope) => {
      const symbol = scope.table.get(node.identifier.lexeme);

      if (!symbol) {
        return;
      }

      // Report a redeclaration of an existing symbol
      if (node.variableType && symbol.node !== node) {
        report(`You can't declare a variable with the name '${node.identifier.lexeme}' as it already exists`, node.span, (error) => {
          error.info('Remove the type or change the name of the variable', node.span);
        });
      }

      const declareOrReassign = node.variableType ? 'declare' : 'reassign';

      let errorMessage: string | null = null;
      switch (symbol.node.type) {
        case grammar.SyntacticToken.FUNCTION_DECL:
          errorMessage = `You can't ${declareOrReassign} a variable with the name '${node.identifier.lexeme}' as it's already used as a function name`;
          break;

        case grammar.SyntacticToken.CLASS_DECL:
          errorMessage = `You can't ${declareOrReassign} a variable with the name '${node.identifier.lexeme}' as it's already used as a class name`;
          break;

        case grammar.SyntacticToken.IMPORT_DECL:
          errorMessage = `You can't ${declareOrReassign} a variable with the name '${node.identifier.lexeme}' as it's already used as an import name`;
          break;

        default: break;
      }

      if (errorMessage) {
        report(errorMessage, node.span, (error) => {
          error.info('Change the name of the variable', node.identifier.span);
        });
      }
    });
  },
};
