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
    walker.onEnter(grammar.VariableDeclaration, (node, ctx) => {
      const symbol = findSymbol(ctx.scope, node.identifier.lexeme);

      if (symbol && symbol.node !== node) {
        report("You can't redeclare a variable", node.span);
      }
    });
  },
};
