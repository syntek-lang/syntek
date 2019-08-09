import {
  Node, Token, SyntacticToken, VariableType, FunctionParam,
} from '..';

import { Span } from '../../position';

export function isDeclaration(node: Node): boolean {
  return node.type === SyntacticToken.VARIABLE_DECL
    || node.type === SyntacticToken.FUNCTION_DECL
    || node.type === SyntacticToken.CLASS_DECL
    || node.type === SyntacticToken.IMPORT_DECL;
}

export class VariableDeclaration extends Node {
  readonly identifier: Token;

  readonly variableType: VariableType | null;

  readonly value: Node;

  constructor(
    identifier: Token,
    variableType: VariableType | null,
    value: Node,
    span: Span,
  ) {
    super(SyntacticToken.VARIABLE_DECL, span);

    this.identifier = identifier;
    this.variableType = variableType;
    this.value = value;
  }
}

export class FunctionDeclaration extends Node {
  readonly identifier: Token;

  readonly params: FunctionParam[];

  readonly returnType: VariableType | null;

  readonly body: Node[];

  constructor(
    identifier: Token,
    params: FunctionParam[],
    returnType: VariableType | null,
    body: Node[],
    span: Span,
  ) {
    super(SyntacticToken.FUNCTION_DECL, span);

    this.identifier = identifier;
    this.params = params;
    this.returnType = returnType;
    this.body = body;
  }
}

export class ClassDeclaration extends Node {
  readonly identifier: Token;

  readonly extends: Token[];

  readonly staticBody: Node[];

  readonly instanceBody: Node[];

  constructor(
    identifier: Token,
    extend: Token[],
    staticBody: Node[],
    instanceBody: Node[],
    span: Span,
  ) {
    super(SyntacticToken.CLASS_DECL, span);

    this.identifier = identifier;
    this.extends = extend;
    this.staticBody = staticBody;
    this.instanceBody = instanceBody;
  }
}

export class ImportDeclaration extends Node {
  readonly source: Token;

  readonly identifier: Token | null;

  constructor(source: Token, identifier: Token | null, span: Span) {
    super(SyntacticToken.IMPORT_DECL, span);

    this.source = source;
    this.identifier = identifier;
  }
}
