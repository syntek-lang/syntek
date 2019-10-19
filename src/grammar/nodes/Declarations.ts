import {
  Node, Token, SyntacticToken, VariableType, Parameter, Constructor, ClassProp, ImportExpose,
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

  readonly params: Parameter[];

  readonly returnType: VariableType | null;

  constructor(
    identifier: Token,
    genericParams: Token[],
    params: Parameter[],
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

  readonly params: Parameter[];

  readonly returnType: VariableType | null;

  readonly body: Node[];

  constructor(
    identifier: Token,
    genericParams: Token[],
    params: Parameter[],
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

  readonly constructors: Constructor[];

  readonly staticBody: ClassProp[];

  readonly instanceBody: ClassProp[];

  constructor(
    abstract: boolean,
    identifier: Token,
    genericParams: Token[],
    extend: VariableType[],
    constructors: Constructor[],
    staticBody: ClassProp[],
    instanceBody: ClassProp[],
    span: Span,
  ) {
    super(SyntacticToken.CLASS_DECL, span);

    this.abstract = abstract;
    this.identifier = identifier;
    this.genericParams = genericParams;
    this.extends = extend;
    this.constructors = constructors;
    this.staticBody = staticBody;
    this.instanceBody = instanceBody;
  }
}

export class ImportDeclaration extends Node {
  readonly path: Token[];

  readonly rename?: Token;

  readonly expose?: ImportExpose[];

  constructor(
    path: Token[],
    rename: Token | null,
    expose: ImportExpose[] | null,
    span: Span,
  ) {
    super(SyntacticToken.IMPORT_DECL, span);

    this.path = path;

    if (rename) {
      this.rename = rename;
    } else if (expose) {
      this.expose = expose;
    }
  }
}
