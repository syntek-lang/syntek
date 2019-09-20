import {
  Node, Token, SyntacticToken, SwitchCase, VariableType,
} from '..';

import { Span } from '../../position';

export function isStatement(node: Node): boolean {
  return node.type === SyntacticToken.IF_STMT
    || node.type === SyntacticToken.ELSE_STMT
    || node.type === SyntacticToken.SWITCH_STMT
    || node.type === SyntacticToken.FOR_STMT
    || node.type === SyntacticToken.REPEAT_STMT
    || node.type === SyntacticToken.WHILE_STMT
    || node.type === SyntacticToken.RETURN_STMT
    || node.type === SyntacticToken.EXPRESSION_STMT

    || node.type === SyntacticToken.BREAK_STMT
    || node.type === SyntacticToken.CONTINUE_STMT;
}

export class IfStatement extends Node {
  readonly condition: Node;

  readonly body: Node[];

  readonly elseClause: Node | null;

  readonly ifSpan: Span;

  constructor(condition: Node, body: Node[], elseClause: Node | null, span: Span) {
    super(SyntacticToken.IF_STMT, span);

    this.condition = condition;
    this.body = body;
    this.elseClause = elseClause;

    this.ifSpan = new Span(span.start, body[body.length - 1].span.end);
  }
}

export class ElseStatement extends Node {
  readonly body: Node[];

  constructor(body: Node[], span: Span) {
    super(SyntacticToken.ELSE_STMT, span);

    this.body = body;
  }
}

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

export class RepeatStatement extends Node {
  readonly amount: Node;

  readonly body: Node[];

  constructor(amount: Node, body: Node[], span: Span) {
    super(SyntacticToken.REPEAT_STMT, span);

    this.amount = amount;
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
