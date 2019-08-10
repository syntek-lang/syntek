import * as grammar from '../../../grammar';
import { ASTWalker } from '../../../walker';

import { Scope, ClassScope, SymbolEntry } from '../..';

function addReference(node: grammar.Node, scope: Scope, name: string): void {
  let symbol: SymbolEntry | undefined;

  // TODO: make a utils file for this type of logic
  if (scope instanceof ClassScope && node.type !== grammar.SyntacticToken.VARIABLE_DECL) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    symbol = scope.parent!.table.get(name);
  } else {
    symbol = scope.table.get(name);
  }

  if (symbol && symbol.node !== node) {
    symbol.references.push(node);
  }
}

export function findReferences(ast: grammar.Node, programScope: Scope): void {
  new ASTWalker(ast, programScope)
    // Declarations
    .onEnter(grammar.VariableDeclaration, (node, scope) => {
      addReference(node, scope, node.identifier.lexeme);

      if (node.variableType) {
        addReference(node, scope, node.variableType.type.lexeme);
      }
    })

    .onEnter(grammar.FunctionDeclaration, (node, scope) => {
      node.params.forEach((param) => {
        if (param.variableType) {
          addReference(node, scope, param.variableType.type.lexeme);
        }
      });

      if (node.returnType) {
        addReference(node, scope, node.returnType.type.lexeme);
      }
    })

    .onEnter(grammar.ClassDeclaration, (node, scope) => {
      node.extends.forEach((extend) => {
        addReference(node, scope, extend.lexeme);
      });
    })

    // Expressions
    .onEnter(grammar.Identifier, (node, scope) => {
      addReference(node, scope, node.lexeme);
    })

    // Statements
    .onEnter(grammar.ForStatement, (node, scope) => {
      if (node.variableType) {
        addReference(node, scope, node.variableType.type.lexeme);
      }
    })

    .onEnter(grammar.CatchStatement, (node, scope) => {
      if (node.variableType) {
        addReference(node, scope, node.variableType.type.lexeme);
      }
    })

    .walk();
}
