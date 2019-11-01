import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

import { WalkerContext } from '../../../walker';

export const noUndefined: LinterRule = {
  description: 'Report references to undefined variables',
  level: Level.ERROR,
  create(walker, report) {
    function checkDeclared(node: grammar.Node, ctx: WalkerContext): void {
      if (node.type === grammar.SyntacticToken.IDENTIFIER) {
        const identifier = node as grammar.Identifier;
        const scope = ctx.getScope();

        // If there is no symbol or function with the given name, report it
        if (!scope.hasSymbol(identifier.lexeme) && !scope.hasFunction(identifier.lexeme)) {
          report(`No symbol with the name '${identifier.lexeme}'`, identifier.span);
        }
      }
    }

    walker
      // Declarations
      .onEnter(grammar.VariableDeclaration, (node, ctx) => checkDeclared(node.value, ctx))

      // Expressions
      .onEnter(grammar.AssignmentExpression, (node, ctx) => {
        checkDeclared(node.left, ctx);
        checkDeclared(node.value, ctx);
      })
      .onEnter(grammar.WrappedExpression, (node, ctx) => checkDeclared(node.expression, ctx))
      .onEnter(grammar.UnaryExpression, (node, ctx) => checkDeclared(node.right, ctx))
      .onEnter(grammar.BinaryExpression, (node, ctx) => {
        checkDeclared(node.left, ctx);
        checkDeclared(node.right, ctx);
      })
      .onEnter(grammar.CallExpression, (node, ctx) => {
        checkDeclared(node.object, ctx);
        node.params.forEach(param => checkDeclared(param, ctx));
      })
      .onEnter(grammar.IndexExpression, (node, ctx) => {
        checkDeclared(node.object, ctx);
        checkDeclared(node.index, ctx);
      })
      .onEnter(grammar.MemberExpression, (node, ctx) => checkDeclared(node.object, ctx))
      .onEnter(grammar.NewExpression, (node, ctx) => {
        checkDeclared(node.object, ctx);
        node.params.forEach(param => checkDeclared(param, ctx));
      })
      .onEnter(grammar.InstanceofExpression, (node, ctx) => {
        checkDeclared(node.left, ctx);
        checkDeclared(node.right, ctx);
      })
      .onEnter(grammar.AsyncExpression, (node, ctx) => checkDeclared(node.expression, ctx))
      .onEnter(grammar.ArrayExpression, (node, ctx) => {
        node.content.forEach(value => checkDeclared(value, ctx));
      })
      .onEnter(grammar.IfExpression, (node, ctx) => checkDeclared(node.condition, ctx))

      // Statements
      .onEnter(grammar.ForStatement, (node, ctx) => checkDeclared(node.object, ctx))
      .onEnter(grammar.WhileStatement, (node, ctx) => checkDeclared(node.condition, ctx))
      .onEnter(grammar.ReturnStatement, (node, ctx) => {
        if (node.expression) {
          checkDeclared(node.expression, ctx);
        }
      })
      .onEnter(grammar.YieldStatement, (node, ctx) => checkDeclared(node.expression, ctx))
      .onEnter(grammar.ExpressionStatement, (node, ctx) => checkDeclared(node.expression, ctx))

      // Other
      .onEnter(grammar.VariableType, (node, ctx) => checkDeclared(node.object, ctx));
  },
};
