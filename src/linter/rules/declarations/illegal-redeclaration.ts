import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

import {
  Scope, ClassScope,
  SymbolEntry,
  mangleFunctionName, mangleConstructor,
} from '../../../scope';

type Func = grammar.FunctionDeclaration | grammar.EmptyFunctionDeclaration;

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
    function error(type: string, name: grammar.Token): void {
      report(`You can't declare a ${type} with the name '${name.lexeme}', because it is already used`, name.span);
    }

    function checkDeclaration(
      node: grammar.Node,
      scope: Scope,
      type: string,
      name: grammar.Token,
    ): void {
      const symbol = findSymbol(scope, name.lexeme);

      if ((symbol && symbol.node !== node) || scope.hasFunction(name.lexeme)) {
        error(type, name);
      }
    }

    function checkFunctionDeclaration(node: Func, scope: Scope): void {
      // Check regular name
      const symbol = findSymbol(scope, node.identifier.lexeme);

      if (symbol && !grammar.isFunction(symbol.node)) {
        error('function', node.identifier);
      } else {
        // Check mangled function name
        const name = mangleFunctionName(node);
        const mangledSymbol = findSymbol(scope, name);

        if (!mangledSymbol || mangledSymbol.node === node) {
          return;
        }

        if (mangledSymbol.scope === scope) {
          report(`Identical function overload exists for '${node.identifier.lexeme}'`, node.span);
        } else {
          error('function', node.identifier);
        }
      }
    }

    walker
      .onEnter(grammar.EmptyVariableDeclaration, (node, ctx) => checkDeclaration(node, ctx.scope, 'variable', node.identifier))
      .onEnter(grammar.VariableDeclaration, (node, ctx) => checkDeclaration(node, ctx.scope, 'variable', node.identifier))
      .onEnter(grammar.Parameter, (node, ctx) => checkDeclaration(node, ctx.scope, 'param', node.name))
      .onEnter(grammar.ForStatement, (node, ctx) => checkDeclaration(node, ctx.scope, 'variable', node.identifier))

      .onEnter(grammar.ClassDeclaration, (node, ctx) => {
        // Check class name
        checkDeclaration(node, ctx.scope, 'class', node.identifier);

        // Check generics
        node.genericParams.forEach((generic) => {
          checkDeclaration(node, ctx.scope, 'generic', generic);
        });

        // Check constructors
        const constructors: string[] = [];

        node.constructors.forEach((constructor) => {
          const mangled = mangleConstructor(constructor);

          if (constructors.includes(mangled)) {
            report('Identical constructor overload exists', constructor.span);
          } else {
            constructors.push(mangled);
          }
        });
      })

      .onEnter(grammar.EmptyFunctionDeclaration, (node, ctx) => {
        checkFunctionDeclaration(node, ctx.scope);

        // Check generics
        node.genericParams.forEach((generic) => {
          // Generics are declared in the function's scope
          const scope = ctx.scope.getScope(node);

          if (scope) {
            checkDeclaration(node, scope, 'generic', generic);
          }
        });
      })
      .onEnter(grammar.FunctionDeclaration, (node, ctx) => {
        checkFunctionDeclaration(node, ctx.scope);

        // Check generics
        node.genericParams.forEach((generic) => {
          // Generics are declared in the function's scope
          const scope = ctx.scope.getScope(node);

          if (scope) {
            checkDeclaration(node, scope, 'generic', generic);
          }
        });
      });
  },
};
