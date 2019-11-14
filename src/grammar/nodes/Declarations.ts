import {
  Node, DeclarationNode,
  Token, SyntacticToken,
  GenericParam, VariableType, Parameter,
  Constructor, ClassProp, ImportExpose,
} from '..';

import { Span } from '../../position';

export class EmptyVariableDeclaration extends DeclarationNode {
  readonly variableType: VariableType;

  constructor(
    identifier: Token,
    variableType: VariableType,
    span: Span,
  ) {
    super(identifier, SyntacticToken.EMPTY_VARIABLE_DECL, span);

    this.variableType = variableType;
  }
}

export class VariableDeclaration extends DeclarationNode {
  readonly variableType: VariableType | null;

  readonly value: Node;

  constructor(
    identifier: Token,
    variableType: VariableType | null,
    value: Node,
    span: Span,
  ) {
    super(identifier, SyntacticToken.VARIABLE_DECL, span);

    this.variableType = variableType;
    this.value = value;
  }
}

export class EmptyFunctionDeclaration extends DeclarationNode {
  readonly genericParams: GenericParam[];

  readonly params: Parameter[];

  readonly returnType: VariableType | null;

  constructor(
    identifier: Token,
    genericParams: GenericParam[],
    params: Parameter[],
    returnType: VariableType | null,
    span: Span,
  ) {
    super(identifier, SyntacticToken.EMPTY_FUNCTION_DECL, span);

    this.genericParams = genericParams;
    this.params = params;
    this.returnType = returnType;
  }
}

export class FunctionDeclaration extends DeclarationNode {
  readonly genericParams: GenericParam[];

  readonly params: Parameter[];

  readonly returnType: VariableType | null;

  readonly body: Node[];

  constructor(
    identifier: Token,
    genericParams: GenericParam[],
    params: Parameter[],
    returnType: VariableType | null,
    body: Node[],
    span: Span,
  ) {
    super(identifier, SyntacticToken.FUNCTION_DECL, span);

    this.genericParams = genericParams;
    this.params = params;
    this.returnType = returnType;
    this.body = body;
  }
}

export class ClassDeclaration extends DeclarationNode {
  readonly abstract: boolean;

  readonly genericParams: GenericParam[];

  readonly extends: VariableType[];

  readonly constructors: Constructor[];

  readonly staticBody: ClassProp[];

  readonly instanceBody: ClassProp[];

  constructor(
    abstract: boolean,
    identifier: Token,
    genericParams: GenericParam[],
    extend: VariableType[],
    constructors: Constructor[],
    staticBody: ClassProp[],
    instanceBody: ClassProp[],
    span: Span,
  ) {
    super(identifier, SyntacticToken.CLASS_DECL, span);

    this.abstract = abstract;
    this.genericParams = genericParams;
    this.extends = extend;
    this.constructors = constructors;
    this.staticBody = staticBody;
    this.instanceBody = instanceBody;
  }
}

export class FullImportDeclaration extends DeclarationNode {
  readonly path: Token[];

  constructor(path: Token[], rename: Token | undefined, span: Span) {
    const identifier = rename || path[path.length - 1];
    super(identifier, SyntacticToken.FULL_IMPORT_DECL, span);

    this.path = path;
  }
}

export class PartialImportDeclaration extends Node {
  readonly path: Token[];

  readonly expose: ImportExpose[];

  constructor(path: Token[], expose: ImportExpose[], span: Span) {
    super(SyntacticToken.PARTIAL_IMPORT_DECL, span);

    this.path = path;
    this.expose = expose;
  }
}
