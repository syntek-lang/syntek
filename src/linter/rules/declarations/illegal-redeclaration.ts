import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

import { Scope, ClassScope, SymbolEntry } from '../../../scope';

function findSymbol(scope: Scope, name: string): SymbolEntry | undefined {
  // If the current scope is a class scope then just look in the current scope
  if (scope instanceof ClassScope) {
    return scope.getOwnSymbol(name);
  }

  // Start from the bottom, to find the original declaration
  if (scope.parent) {
    let symbol: SymbolEntry | undefined;

    // If the parent is a class it should go to the class' parent
    // Otherwise get the symbol from the parent
    if (scope.parent instanceof ClassScope) {
      if (scope.parent.parent) {
        symbol = findSymbol(scope.parent.parent, name);
      }
    } else {
      symbol = findSymbol(scope.parent, name);
    }

    // Only return if the symbol was found, because the current scope could still
    // contain it
    if (symbol) {
      return symbol;
    }
  }

  return scope.getOwnSymbol(name);
}

export const illegalRedeclaration: LinterRule = {
  description: 'Report illegal redeclarations',
  level: Level.ERROR,
  create(walker, report) {
    function checkDeclaration(node: grammar.Node, scope: Scope, type: string, name: string): void {
      const symbol = findSymbol(scope, name);

      if (symbol && symbol.node !== node) {
        report(`You can't declare a ${type} with the name '${name}', because it is already used`, node.span);
      }
    }

    walker
      .onEnter(grammar.EmptyVariableDeclaration, (node, ctx) => checkDeclaration(node, ctx.scope, 'variable', node.identifier.lexeme))
      .onEnter(grammar.VariableDeclaration, (node, ctx) => checkDeclaration(node, ctx.scope, 'variable', node.identifier.lexeme))
      .onEnter(grammar.FunctionParam, (node, ctx) => checkDeclaration(node, ctx.scope, 'param', node.name.lexeme))
      .onEnter(grammar.ForStatement, (node, ctx) => checkDeclaration(node, ctx.scope, 'variable', node.identifier.lexeme))

      .onEnter(grammar.ClassDeclaration, (node, ctx) => {
        // Check class name
        checkDeclaration(node, ctx.scope, 'class', node.identifier.lexeme);

        // Check generics
        node.genericParams.forEach((generic) => {
          checkDeclaration(node, ctx.scope, 'generic', generic.lexeme);
        });
      })

      .onEnter(grammar.EmptyFunctionDeclaration, (node, ctx) => {
        // TODO: mangle function name for overloading
        const name = node.identifier.lexeme;

        // Check function name
        checkDeclaration(node, ctx.scope, 'function', name);

        // Check generics
        node.genericParams.forEach((generic) => {
          // Generics are declared in the function's scope
          const scope = ctx.scope.getScope(node);

          if (scope) {
            checkDeclaration(node, scope, 'generic', generic.lexeme);
          }
        });
      })
      .onEnter(grammar.FunctionDeclaration, (node, ctx) => {
        // TODO: mangle function name for overloading
        const name = node.identifier.lexeme;

        // Check function name
        checkDeclaration(node, ctx.scope, 'function', name);

        // Check generics
        node.genericParams.forEach((generic) => {
          // Generics are declared in the function's scope
          const scope = ctx.scope.getScope(node);

          if (scope) {
            checkDeclaration(node, scope, 'generic', generic.lexeme);
          }
        });
      });
  },
};
