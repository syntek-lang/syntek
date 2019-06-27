import { Node, SyntacticToken, TokenLocation } from '../..';

export function isDeclaration(node: Node): boolean {
  return node.type === SyntacticToken.VARIABLE_DECL
    || node.type === SyntacticToken.FUNCTION_DECL
    || node.type === SyntacticToken.CLASS_DECL
    || node.type === SyntacticToken.IMPORT_DECL;
}

export class VariableDeclaration extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.VARIABLE_DECL, location);
  }
}

export class FunctionDeclaration extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.FUNCTION_DECL, location);
  }
}

export class ClassDeclaration extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.CLASS_DECL, location);
  }
}

export class ImportDeclaration extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.IMPORT_DECL, location);
  }
}
