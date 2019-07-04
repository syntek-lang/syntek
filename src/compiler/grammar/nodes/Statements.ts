import {
  Node, Token, SyntacticToken, TokenLocation, SwitchCase,
} from '../..';

export function isStatement(node: Node): boolean {
  return node.type === SyntacticToken.IF_STMT
    || node.type === SyntacticToken.ELSE_STMT
    || node.type === SyntacticToken.SWITCH_STMT
    || node.type === SyntacticToken.FOR_STMT
    || node.type === SyntacticToken.REPEAT_STMT
    || node.type === SyntacticToken.WHILE_STMT
    || node.type === SyntacticToken.TRY_STMT
    || node.type === SyntacticToken.THROW_STMT
    || node.type === SyntacticToken.RETURN_STMT
    || node.type === SyntacticToken.EXPRESSION_STMT;
}

export class IfStatement extends Node {
  readonly condition: Node;

  readonly body: Node[];

  readonly elseClause: Node | null;

  constructor(condition: Node, body: Node[], elseClause: Node | null, location: TokenLocation) {
    super(SyntacticToken.IF_STMT, location);

    this.condition = condition;
    this.body = body;
    this.elseClause = elseClause;
  }
}

export class ElseStatement extends Node {
  readonly body: Node[];

  constructor(body: Node[], location: TokenLocation) {
    super(SyntacticToken.ELSE_STMT, location);

    this.body = body;
  }
}

export class SwitchStatement extends Node {
  readonly expression: Node;

  readonly cases: SwitchCase[];

  constructor(expression: Node, cases: SwitchCase[], location: TokenLocation) {
    super(SyntacticToken.SWITCH_STMT, location);

    this.expression = expression;
    this.cases = cases;
  }
}

export class ForStatement extends Node {
  readonly identifier: Token;

  readonly variableType: Token | null;

  readonly arrayDepth: number;

  readonly object: Node;

  readonly body: Node[];

  constructor(
    identifier: Token,
    variableType: Token | null,
    arrayDepth: number,
    object: Node,
    body: Node[],
    location: TokenLocation,
  ) {
    super(SyntacticToken.FOR_STMT, location);

    this.identifier = identifier;
    this.variableType = variableType;
    this.arrayDepth = arrayDepth;
    this.object = object;
    this.body = body;
  }
}

export class RepeatStatement extends Node {
  readonly amount: Node;

  readonly body: Node[];

  constructor(amount: Node, body: Node[], location: TokenLocation) {
    super(SyntacticToken.REPEAT_STMT, location);

    this.amount = amount;
    this.body = body;
  }
}

export class WhileStatement extends Node {
  readonly condition: Node;

  readonly body: Node[];

  constructor(condition: Node, body: Node[], location: TokenLocation) {
    super(SyntacticToken.WHILE_STMT, location);

    this.condition = condition;
    this.body = body;
  }
}

export class TryStatement extends Node {
  readonly tryBody: Node[];

  readonly identifier: Token;

  readonly variableType: Token | null;

  readonly arrayDepth: number;

  readonly catchBody: Node[];

  constructor(
    tryBody: Node[],
    identifier: Token,
    variableType: Token | null,
    arrayDepth: number,
    catchBody: Node[],
    location: TokenLocation,
  ) {
    super(SyntacticToken.TRY_STMT, location);

    this.tryBody = tryBody;
    this.identifier = identifier;
    this.variableType = variableType;
    this.arrayDepth = arrayDepth;
    this.catchBody = catchBody;
  }
}

export class ThrowStatement extends Node {
  readonly expression: Node;

  constructor(expression: Node, location: TokenLocation) {
    super(SyntacticToken.THROW_STMT, location);

    this.expression = expression;
  }
}

export class ReturnStatement extends Node {
  readonly expression: Node | null;

  constructor(expression: Node | null, location: TokenLocation) {
    super(SyntacticToken.RETURN_STMT, location);

    this.expression = expression;
  }
}

export class ExpressionStatement extends Node {
  readonly expression: Node;

  constructor(expression: Node, location: TokenLocation) {
    super(SyntacticToken.EXPRESSION_STMT, location);

    this.expression = expression;
  }
}

export class BreakStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.BREAK_STMT, location);
  }
}

export class ContinueStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.CONTINUE_STMT, location);
  }
}

export class FallthroughStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.FALLTHROUGH_STMT, location);
  }
}
