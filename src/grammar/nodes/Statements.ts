import {
  Node, Token, SyntacticToken, SwitchCase, VariableType,
} from '..';

import { Span } from '../../position';

export class SwitchStatement extends Node {
  readonly expression: Node;

  readonly cases: SwitchCase[];

  constructor(expression: Node, cases: SwitchCase[], span: Span) {
    super(SyntacticToken.SWITCH_STMT, span);

    this.expression = expression;
    this.cases = cases;
  }
}

export class ForStatement extends Node {
  readonly identifier: Token;

  readonly variableType: VariableType | null;

  readonly object: Node;

  readonly body: Node[];

  constructor(
    identifier: Token,
    variableType: VariableType | null,
    object: Node,
    body: Node[],
    span: Span,
  ) {
    super(SyntacticToken.FOR_STMT, span);

    this.identifier = identifier;
    this.variableType = variableType;
    this.object = object;
    this.body = body;
  }
}

export class WhileStatement extends Node {
  readonly condition: Node;

  readonly body: Node[];

  constructor(condition: Node, body: Node[], span: Span) {
    super(SyntacticToken.WHILE_STMT, span);

    this.condition = condition;
    this.body = body;
  }
}

export class ReturnStatement extends Node {
  readonly expression: Node | null;

  constructor(expression: Node | null, span: Span) {
    super(SyntacticToken.RETURN_STMT, span);

    this.expression = expression;
  }
}

export class YieldStatement extends Node {
  readonly expression: Node;

  constructor(expression: Node, span: Span) {
    super(SyntacticToken.YIELD_STMT, span);

    this.expression = expression;
  }
}

export class ExpressionStatement extends Node {
  readonly expression: Node;

  constructor(expression: Node, span: Span) {
    super(SyntacticToken.EXPRESSION_STMT, span);

    this.expression = expression;
  }
}

export class BreakStatement extends Node {
  constructor(span: Span) {
    super(SyntacticToken.BREAK_STMT, span);
  }
}

export class ContinueStatement extends Node {
  constructor(span: Span) {
    super(SyntacticToken.CONTINUE_STMT, span);
  }
}
