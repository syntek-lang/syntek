import {
  Node, DeclarationNode, Token, SyntacticToken, Identifier, MemberExpression,
} from '..';
import { Span } from '../../position';

export class NativeNode extends DeclarationNode {
  constructor(identifier: Token) {
    super(identifier, SyntacticToken.NATIVE_NODE, new Span([0, 0], [0, 0]));
  }
}

export class Program extends Node {
  readonly body: Node[];

  constructor(body: Node[], span: Span) {
    super(SyntacticToken.PROGRAM, span);

    this.body = body;
  }
}

export class VariableType extends Node {
  readonly object: Identifier | MemberExpression;

  readonly generics: VariableType[];

  readonly arrayDepth: number;

  constructor(
    object: Identifier | MemberExpression,
    generics: VariableType[],
    arrayDepth: number,
    span: Span,
  ) {
    super(SyntacticToken.VARIABLE_TYPE, span);

    this.object = object;
    this.generics = generics;
    this.arrayDepth = arrayDepth;
  }
}

export class Parameter extends DeclarationNode {
  readonly variableType: VariableType;

  constructor(identifier: Token, variableType: VariableType, span: Span) {
    super(identifier, SyntacticToken.PARAMETER, span);

    this.variableType = variableType;
  }
}

export class Constructor extends Node {
  readonly params: Parameter[];

  readonly body: Node[];

  constructor(params: Parameter[], body: Node[], span: Span) {
    super(SyntacticToken.CONSTRUCTOR, span);

    this.params = params;
    this.body = body;
  }
}

export class ClassProp extends Node {
  readonly value: Node;

  readonly abstract: boolean;

  readonly static: boolean;

  constructor(value: Node, abstract: boolean, isStatic: boolean, span: Span) {
    super(SyntacticToken.CLASS_PROP, span);

    this.value = value;
    this.abstract = abstract;
    this.static = isStatic;
  }
}

export class ImportExpose extends DeclarationNode {
  readonly value: Token;

  constructor(value: Token, rename: Token | undefined, span: Span) {
    const identifier = rename || value;
    super(identifier, SyntacticToken.IMPORT_EXPOSE, span);

    this.value = value;
  }
}
