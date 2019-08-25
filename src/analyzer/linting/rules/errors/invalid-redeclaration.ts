import * as grammar from '../../../../grammar';

import { LintingRule } from '../..';
import { Scope } from '../../..';
import { Level } from '../../../../diagnostic';

export const invalidRedeclaration: LintingRule = {
  name: 'invalid-redeclaration',
  description: 'Report invalid redeclarations',
  level: Level.ERROR,
  create(walker, report) {
    function checkNode(
      node: grammar.Node,
      scope: Scope,
      identifier: grammar.Token,
      type: string,
    ): void {
      const symbol = scope.table.get(identifier.lexeme);

      if (symbol && symbol.node !== node) {
        report(`The name '${identifier.lexeme}' is already used`, node.span, (error) => {
          error.info(`Change the name of the ${type}`, identifier.span);
        });
      }
    }

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

    walker.onEnter(grammar.FunctionDeclaration, (node, scope) => {
      checkNode(node, scope, node.identifier, 'function');
    });

    walker.onEnter(grammar.ClassDeclaration, (node, scope) => {
      checkNode(node, scope, node.identifier, 'class');
    });

    walker.onEnter(grammar.ImportDeclaration, (node, scope) => {
      checkNode(node, scope, node.identifier, 'import');
    });

    walker.onEnter(grammar.ForStatement, (node, scope) => {
      checkNode(node, scope, node.identifier, 'variable');
    });

    walker.onEnter(grammar.CatchStatement, (node, scope) => {
      checkNode(node, scope, node.identifier, 'variable');
    });
  },
};
