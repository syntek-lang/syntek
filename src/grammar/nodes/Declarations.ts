import {
  Node, Token, SyntacticToken, TokenLocation, VariableType, FunctionParam,
} from '..';

export function isDeclaration(node: Node): boolean {
  return node.type === SyntacticToken.VARIABLE_DECL
    || node.type === SyntacticToken.FUNCTION_DECL
    || node.type === SyntacticToken.CLASS_DECL
    || node.type === SyntacticToken.IMPORT_DECL;
}

export class VariableDeclaration extends Node {
  readonly identifier: Token;

  readonly variableType: VariableType;

  readonly value: Node;

  constructor(
    identifier: Token,
    variableType: VariableType,
    value: Node,
    location: TokenLocation,
  ) {
    super(SyntacticToken.VARIABLE_DECL, location);

    this.identifier = identifier;
    this.variableType = variableType;
    this.value = value;
  }
}

export class FunctionDeclaration extends Node {
  readonly identifier: Token;

  readonly params: FunctionParam[];

  readonly returnType: VariableType;

  readonly body: Node[];

  constructor(
    identifier: Token,
    params: FunctionParam[],
    returnType: VariableType,
    body: Node[],
    location: TokenLocation,
  ) {
    super(SyntacticToken.FUNCTION_DECL, location);

    this.identifier = identifier;
    this.params = params;
    this.returnType = returnType;
    this.body = body;
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
