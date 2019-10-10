import {
  Node, Token, SyntacticToken, Identifier, MemberExpression,
} from '..';
import { Span } from '../../position';

export class Program extends Node {
  readonly body: Node[];

  constructor(body: Node[], span: Span) {
    super(SyntacticToken.PROGRAM, span);

    this.body = body;
  }
}

export class SwitchCase extends Node {
  readonly conditions: Node[];

  readonly body: Node[];

  constructor(conditions: Node[], body: Node[], span: Span) {
    super(SyntacticToken.SWITCH_CASE, span);

    this.conditions = conditions;
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

export class FunctionParam extends Node {
  readonly name: Token;

  readonly variableType: VariableType | null;

  constructor(name: Token, variableType: VariableType | null, span: Span) {
    super(SyntacticToken.FUNCTION_PARAM, span);

    this.name = name;
    this.variableType = variableType;
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
