import {
  Node, Token, SyntacticToken, TokenLocation,
} from '..';

export function isDeclaration(node: Node): boolean {
  return node.type === SyntacticToken.VARIABLE_DECL
    || node.type === SyntacticToken.FUNCTION_DECL
    || node.type === SyntacticToken.CLASS_DECL
    || node.type === SyntacticToken.IMPORT_DECL;
}

export class VariableDeclaration extends Node {
  readonly identifier: Token;

  readonly variableType: Token | null;

  readonly arrayDepth: number;

  readonly value: Node;

  constructor(
    identifier: Token,
    variableType: Token | null,
    arrayDepth: number,
    value: Node,
    location: TokenLocation,
  ) {
    super(SyntacticToken.VARIABLE_DECL, location);

    this.identifier = identifier;
    this.variableType = variableType;
    this.arrayDepth = arrayDepth;
    this.value = value;
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
  readonly source: Token;

  readonly identifier: Token | null;

  constructor(source: Token, identifier: Token | null, location: TokenLocation) {
    super(SyntacticToken.IMPORT_DECL, location);

    this.source = source;
    this.identifier = identifier;
  }
}
