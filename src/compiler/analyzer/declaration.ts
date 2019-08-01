import * as grammar from '../../grammar';
import { ASTWalker } from '../../walker';
import { FileScope } from './scopes/FileScope';

export function findDeclarations(ast: grammar.Node): FileScope {
  const walker = new ASTWalker(ast);
  const fileScope = new FileScope();
  let currentScope = fileScope; // eslint-disable-line prefer-const

  // Handle declarations
  walker
    .onEnter(grammar.SyntacticToken.IMPORT_DECL, (node) => {
      currentScope.imports.push(node);
    })
    .onEnter(grammar.SyntacticToken.CLASS_DECL, (node) => {
      currentScope.classes.push(node);
    })
    .onEnter(grammar.SyntacticToken.VARIABLE_DECL, (node) => {
      currentScope.variables.push(node);
    })
    .onEnter(grammar.SyntacticToken.ASSIGNMENT_EXPR, (node) => {
      currentScope.variables.push(node);
    })
    .onEnter(grammar.SyntacticToken.FUNCTION_DECL, (node) => {
      currentScope.functions.push(node);
    });

  // TODO: Handle scope changes

  walker.walk();
  return fileScope;
}
