import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

import {
  Scope, ClassScope, FunctionScope, StaticScope,
} from '../../../scope';
import { WalkerContext } from '../../../walker';

function inInitializer(
  decl: grammar.VariableDeclaration,
  value: grammar.Node,
  parents: grammar.Node[],
): boolean {
  if (decl.value === value) {
    return true;
  }

  for (let i = parents.length - 1; i >= 0; i -= 1) {
    if (parents[i] === decl) {
      return true;
    }
  }

  return false;
}

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
      const scope = ctx.getScope();

      if (node.type === grammar.SyntacticToken.IDENTIFIER) {
        const identifier = node as grammar.Identifier;

        // Ignore unresolved identifiers, and ignore functions
        if (!scope.hasSymbol(identifier.lexeme) || scope.hasFunction(identifier.lexeme)) {
          return;
        }

        const symbol = scope.getSymbol(identifier.lexeme);

        // Check if the node is after the declaration
        if (node.span.after(symbol.node.identifier.span)) {
          if (!(symbol.node instanceof grammar.VariableDeclaration)) {
            return;
          }

          // Check if the symbol is accessed in its initializer, such as:
          // var x = x
          if (!inInitializer(symbol.node, identifier, ctx.parents)) {
            return;
          }
        }

        if (isImmediateReference(identifier, scope)) {
          report(`'${identifier.lexeme}' is used before its declaration`, identifier.span);
        }
      } else if (node.type === grammar.SyntacticToken.MEMBER_EXPR) {
        const expr = node as grammar.MemberExpression;

        if (expr.object.type === grammar.SyntacticToken.THIS) {
          // Get the symbol from the this variable
          const thisScope = scope.getThis();
          const symbol = thisScope.table.get(expr.property.lexeme);

          // Ignore unresolved identifiers, and ignore functions
          if (!symbol || thisScope.table.hasFunction(expr.property.lexeme)) {
            return;
          }

          // Check if the node is after the declaration
          if (node.span.after(symbol.node.identifier.span)) {
            if (!(symbol.node instanceof grammar.VariableDeclaration)) {
              return;
            }

            // Check if the symbol is accessed in its initializer, such as:
            // class A { var x = this.x }
            if (!inInitializer(symbol.node, expr, ctx.parents)) {
              return;
            }
          }

          report(`'${expr.property.lexeme}' is used before its declaration`, expr.span);
        } else if (
          expr.object.type === grammar.SyntacticToken.IDENTIFIER && scope instanceof StaticScope
        ) {
          const identifier = expr.object as grammar.Identifier;

          if (!scope.hasSymbol(identifier.lexeme)) {
            return;
          }

          // Check whether the object is the current class
          if (scope.getSymbol(identifier.lexeme).node !== scope.node) {
            return;
          }

          // Get the property of the class
          const symbol = scope.table.get(expr.property.lexeme);

          if (!symbol) {
            return;
          }

          // Check if the node is after the declaration
          if (node.span.after(symbol.node.identifier.span)) {
            if (!(symbol.node instanceof grammar.VariableDeclaration)) {
              return;
            }

            // Check if the symbol is accessed in its initializer, such as:
            // class A { static var x = A.x }
            if (!inInitializer(symbol.node, expr, ctx.parents)) {
              return;
            }
          }

          report(`'${expr.property.lexeme}' is used before its declaration`, expr.span);
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
