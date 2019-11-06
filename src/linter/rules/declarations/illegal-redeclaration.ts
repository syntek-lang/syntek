import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

import {
  Scope, ClassScope, StaticScope,
  SymbolEntry,
  mangleFunctionName, mangleConstructor,
} from '../../../symbols';

type Func = grammar.FunctionDeclaration | grammar.EmptyFunctionDeclaration;

function findSymbol(scope: Scope, parents: grammar.Node[], name: string): SymbolEntry | undefined {
  // If the current scope is a class scope then just look in the current scope
  if (scope instanceof ClassScope || scope instanceof StaticScope) {
    return scope.table.get(name);
  }

  // Start from the bottom, to find the original declaration
  if (scope.parent) {
    let symbol: SymbolEntry | undefined;

    // If the parent is a class it should go to the class' parent
    // Otherwise get the symbol from the parent
    if (scope.parent instanceof ClassScope) {
      if (scope.parent.parent) {
        symbol = findSymbol(scope.parent.parent, parents, name);
      }
    } else {
      symbol = findSymbol(scope.parent, parents, name);
    }

    // Only return if the symbol was found, because the current scope could still
    // contain it
    if (symbol) {
      return symbol;
    }
  }

  return scope.table.get(name);
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
      parents: grammar.Node[],
      type: string,
      name: grammar.Token,
    ): void {
      const symbol = findSymbol(scope, parents, name.lexeme);

      if ((symbol && symbol.node !== node) || scope.hasFunction(name.lexeme)) {
        error(type, name);
      }
    }

    function checkFunctionDeclaration(node: Func, scope: Scope, parents: grammar.Node[]): void {
      // Check regular name
      const symbol = findSymbol(scope, parents, node.identifier.lexeme);

      if (symbol && !grammar.isFunction(symbol.node)) {
        error('function', node.identifier);
      } else {
        // Check mangled function name
        const name = mangleFunctionName(node);
        const mangledSymbol = findSymbol(scope, parents, name);

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
      .onEnter(grammar.EmptyVariableDeclaration, (node, ctx) => checkDeclaration(node, ctx.getScope(), ctx.parents, 'variable', node.identifier))
      .onEnter(grammar.VariableDeclaration, (node, ctx) => checkDeclaration(node, ctx.getScope(), ctx.parents, 'variable', node.identifier))
      .onEnter(grammar.Parameter, (node, ctx) => checkDeclaration(node, ctx.getScope(), ctx.parents, 'param', node.identifier))
      .onEnter(grammar.ForStatement, (node, ctx) => checkDeclaration(node, ctx.getScope(), ctx.parents, 'variable', node.identifier))

      .onEnter(grammar.ClassDeclaration, (node, ctx) => {
        // Check class name
        checkDeclaration(node, ctx.getScope(), ctx.parents, 'class', node.identifier);

        // Check generics
        node.genericParams.forEach((generic) => {
          // Check if the class name is equal to the generic
          // This has to be done manually because the node for generics IS the class
          if (node.identifier.lexeme === generic.lexeme) {
            error('generic', generic);
          } else {
            checkDeclaration(node, ctx.getScope(), ctx.parents, 'generic', generic);
          }
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
        checkFunctionDeclaration(node, ctx.getScope(), ctx.parents);

        // Check generics
        node.genericParams.forEach((generic) => {
          // Generics are declared in the function's scope
          const scope = ctx.getScope().getScope(node);

          if (scope) {
            checkDeclaration(node, scope, ctx.parents, 'generic', generic);
          }
        });
      })
      .onEnter(grammar.FunctionDeclaration, (node, ctx) => {
        checkFunctionDeclaration(node, ctx.getScope(), ctx.parents);

        // Check generics
        node.genericParams.forEach((generic) => {
          // Generics are declared in the function's scope
          const scope = ctx.getScope().getScope(node);

          if (scope) {
            checkDeclaration(node, scope, ctx.parents, 'generic', generic);
          }
        });
      })

      .onEnter(grammar.FullImportDeclaration, (node, ctx) => {
        checkDeclaration(node, ctx.getScope(), ctx.parents, 'import', node.identifier);
      })
      .onEnter(grammar.ImportExpose, (node, ctx) => {
        checkDeclaration(node, ctx.getScope(), ctx.parents, 'import', node.identifier);
      });
  },
};
