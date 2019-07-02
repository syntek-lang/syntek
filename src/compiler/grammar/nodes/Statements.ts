import { Node, SyntacticToken, TokenLocation } from '../..';

export function isStatement(node: Node): boolean {
  return node.type === SyntacticToken.IF_STMT
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
  constructor(location: TokenLocation) {
    super(SyntacticToken.IF_STMT, location);
  }
}

export class SwitchStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.SWITCH_STMT, location);
  }
}

export class ForStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.FOR_STMT, location);
  }
}

export class RepeatStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.REPEAT_STMT, location);
  }
}

export class WhileStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.WHILE_STMT, location);
  }
}

export class TryStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.TRY_STMT, location);
  }
}

export class ThrowStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.THROW_STMT, location);
  }
}

export class ReturnStatement extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.RETURN_STMT, location);
  }
}

export class ExpressionStatement extends Node {
  readonly expression: Node;

  constructor(expression: Node, location: TokenLocation) {
    super(SyntacticToken.EXPRESSION_STMT, location);

    this.expression = expression;
  }
}
