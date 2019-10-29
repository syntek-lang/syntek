import {
  Node, Token, SyntacticToken, Identifier, MemberExpression,
} from '..';
import { Span } from '../../position';

export class NativeNode extends Node {
  constructor() {
    super(SyntacticToken.NATIVE_NODE, new Span([0, 0], [0, 0]));
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

export class Parameter extends Node {
  readonly name: Token;

  readonly variableType: VariableType;

  constructor(name: Token, variableType: VariableType, span: Span) {
    super(SyntacticToken.PARAMETER, span);

    this.name = name;
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

export class ImportExpose extends Node {
  readonly value: Token;

  readonly rename?: Token;

  constructor(value: Token, rename: Token | null, span: Span) {
    super(SyntacticToken.IMPORT_EXPOSE, span);

    this.value = value;

    if (rename) {
      this.rename = rename;
    }
  }
}
