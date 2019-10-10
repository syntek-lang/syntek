import {
  Node, Token, SyntacticToken, VariableType, FunctionParam, ClassProp,
} from '..';

import { Span } from '../../position';

export class EmptyVariableDeclaration extends Node {
  readonly identifier: Token;

  readonly variableType: VariableType | null;

  constructor(
    identifier: Token,
    variableType: VariableType | null,
    span: Span,
  ) {
    super(SyntacticToken.EMPTY_VARIABLE_DECL, span);

    this.identifier = identifier;
    this.variableType = variableType;
  }
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

export class EmptyFunctionDeclaration extends Node {
  readonly identifier: Token;

  readonly genericParams: Token[];

  readonly params: FunctionParam[];

  readonly returnType: VariableType | null;

  constructor(
    identifier: Token,
    genericParams: Token[],
    params: FunctionParam[],
    returnType: VariableType | null,
    span: Span,
  ) {
    super(SyntacticToken.EMPTY_FUNCTION_DECL, span);

    this.identifier = identifier;
    this.genericParams = genericParams;
    this.params = params;
    this.returnType = returnType;
  }
}

export class FunctionDeclaration extends Node {
  readonly identifier: Token;

  readonly genericParams: Token[];

  readonly params: FunctionParam[];

  readonly returnType: VariableType | null;

  readonly body: Node[];

  constructor(
    identifier: Token,
    genericParams: Token[],
    params: FunctionParam[],
    returnType: VariableType | null,
    body: Node[],
    span: Span,
  ) {
    super(SyntacticToken.FUNCTION_DECL, span);

    this.identifier = identifier;
    this.genericParams = genericParams;
    this.params = params;
    this.returnType = returnType;
    this.body = body;
  }
}

export class ClassDeclaration extends Node {
  readonly abstract: boolean;

  readonly identifier: Token;

  readonly genericParams: Token[];

  readonly extends: VariableType[];

  readonly body: ClassProp[];

  constructor(
    abstract: boolean,
    identifier: Token,
    genericParams: Token[],
    extend: VariableType[],
    body: ClassProp[],
    span: Span,
  ) {
    super(SyntacticToken.CLASS_DECL, span);

    this.abstract = abstract;
    this.identifier = identifier;
    this.genericParams = genericParams;
    this.extends = extend;
    this.body = body;
  }
}

export class ImportDeclaration extends Node {
  readonly source: Token;

  readonly identifier: Token;

  constructor(source: Token, identifier: Token | null, span: Span) {
    super(SyntacticToken.IMPORT_DECL, span);

    this.source = source;

    if (identifier) {
      this.identifier = identifier;
    } else {
      this.identifier = source;
    }
  }
}
