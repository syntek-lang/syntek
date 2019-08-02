import * as grammar from '../../grammar';
import { ASTWalker } from '../../walker';
import { FileScope } from './scopes/FileScope';

export function findDeclarations(ast: grammar.Node): FileScope {
  const walker = new ASTWalker(ast);
  const fileScope = new FileScope();
  let currentScope = fileScope; // eslint-disable-line prefer-const

  // Handle declarations
  walker
    .onEnter(grammar.ImportDeclaration, (node) => {
      currentScope.imports.push(node);
    })
    .onEnter(grammar.ClassDeclaration, (node) => {
      currentScope.classes.push(node);
    })
    .onEnter(grammar.VariableDeclaration, (node) => {
      currentScope.variables.push(node);
    })
    .onEnter(grammar.AssignmentExpression, (node) => {
      currentScope.variables.push(node);
    })
    .onEnter(grammar.FunctionDeclaration, (node) => {
      currentScope.functions.push(node);
    });

  // TODO: Handle scope changes

  walker.walk();
  return fileScope;
}
