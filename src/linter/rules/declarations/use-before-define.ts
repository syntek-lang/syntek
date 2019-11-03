import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

import { Scope, ClassScope, FunctionScope } from '../../../scope';
import { WalkerContext } from '../../../walker';

function isImmediateReference(identifier: grammar.Identifier, scope: Scope): boolean {
  // Class scope never has an immediate reference
  if (scope instanceof ClassScope) {
    return false;
  }

  // If the current scope has the variable it is an immediate reference
  if (scope.table.has(identifier.lexeme)) {
    return true;
  }

  // If the variable is not declared in the current scope, and the current scope is
  // function scope, the variable does not have to be declared before it's use
  if (scope instanceof FunctionScope) {
    return false;
  }

  // Recursively check scopes
  if (scope.parent) {
    return isImmediateReference(identifier, scope.parent);
  }

  return false;
}

export const useBeforeDefine: LinterRule = {
  description: 'Report using variables before being defined',
  level: Level.ERROR,
  create(walker, report) {
    function check(node: grammar.Node, ctx: WalkerContext): void {
      if (node.type === grammar.SyntacticToken.IDENTIFIER) {
        const identifier = node as grammar.Identifier;
        const scope = ctx.getScope();

        // Ignore unresolved identifiers, and ignore functions
        if (!scope.hasSymbol(identifier.lexeme) || scope.hasFunction(identifier.lexeme)) {
          return;
        }

        const symbol = scope.getSymbol(identifier.lexeme);

        // Check if the node is after it's declaration
        if (symbol.node.span.before(node.span) || symbol.node.span.contains(node.span)) {
          return;
        }

        if (isImmediateReference(identifier, scope)) {
          report(`'${identifier.lexeme}' is used before it's declaration`, identifier.span);
        }
      }
    }

    walker
      // Declarations
      .onEnter(grammar.VariableDeclaration, (node, ctx) => check(node.value, ctx))

      // Expressions
      .onEnter(grammar.AssignmentExpression, (node, ctx) => {
        check(node.left, ctx);
        check(node.value, ctx);
      })
      .onEnter(grammar.WrappedExpression, (node, ctx) => check(node.expression, ctx))
      .onEnter(grammar.UnaryExpression, (node, ctx) => check(node.right, ctx))
      .onEnter(grammar.BinaryExpression, (node, ctx) => {
        check(node.left, ctx);
        check(node.right, ctx);
      })
      .onEnter(grammar.CallExpression, (node, ctx) => {
        check(node.object, ctx);
        node.params.forEach(param => check(param, ctx));
      })
      .onEnter(grammar.IndexExpression, (node, ctx) => {
        check(node.object, ctx);
        check(node.index, ctx);
      })
      .onEnter(grammar.MemberExpression, (node, ctx) => check(node.object, ctx))
      .onEnter(grammar.NewExpression, (node, ctx) => {
        check(node.object, ctx);
        node.params.forEach(param => check(param, ctx));
      })
      .onEnter(grammar.InstanceofExpression, (node, ctx) => {
        check(node.left, ctx);
        check(node.right, ctx);
      })
      .onEnter(grammar.AsyncExpression, (node, ctx) => check(node.expression, ctx))
      .onEnter(grammar.ArrayExpression, (node, ctx) => {
        node.content.forEach(value => check(value, ctx));
      })
      .onEnter(grammar.IfExpression, (node, ctx) => check(node.condition, ctx))

      // Statements
      .onEnter(grammar.ForStatement, (node, ctx) => check(node.object, ctx))
      .onEnter(grammar.WhileStatement, (node, ctx) => check(node.condition, ctx))
      .onEnter(grammar.ReturnStatement, (node, ctx) => {
        if (node.expression) {
          check(node.expression, ctx);
        }
      })
      .onEnter(grammar.YieldStatement, (node, ctx) => check(node.expression, ctx))
      .onEnter(grammar.ExpressionStatement, (node, ctx) => check(node.expression, ctx))

      // Other
      .onEnter(grammar.VariableType, (node, ctx) => check(node.object, ctx));
  },
};
