import {
  Token, Node, SyntacticToken, TokenLocation,
} from '../..';

export function isExpression(node: Node): boolean {
  return node.type === SyntacticToken.WRAPPED_EXPR
    || node.type === SyntacticToken.UNARY_EXPR
    || node.type === SyntacticToken.BINARY_EXPR
    || node.type === SyntacticToken.CALL_EXPR
    || node.type === SyntacticToken.INDEX_EXPR
    || node.type === SyntacticToken.MEMBER_EXPR
    || node.type === SyntacticToken.NEW_EXPR
    || node.type === SyntacticToken.INSTANCEOF_EXPR
    || node.type === SyntacticToken.ASYNC_EXPR
    || node.type === SyntacticToken.ARRAY_EXPR
    || node.type === SyntacticToken.OBJECT_EXPR
    || node.type === SyntacticToken.LITERAL_EXPR;
}

export class WrappedExpression extends Node {
  readonly expression: Node;

  constructor(expression: Node, location: TokenLocation) {
    super(SyntacticToken.WRAPPED_EXPR, location);

    this.expression = expression;
  }
}

export class UnaryExpression extends Node {
  readonly operator: Token;

  readonly right: Node;

  constructor(operator: Token, right: Node, location: TokenLocation) {
    super(SyntacticToken.UNARY_EXPR, location);

    this.operator = operator;
    this.right = right;
  }
}

export class BinaryExpression extends Node {
  readonly left: Node;

  readonly operator: Token;

  readonly right: Node;

  constructor(left: Node, operator: Token, right: Node, location: TokenLocation) {
    super(SyntacticToken.BINARY_EXPR, location);

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

export class CallExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.CALL_EXPR, location);
  }
}

export class IndexExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.INDEX_EXPR, location);
  }
}

export class MemberExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.MEMBER_EXPR, location);
  }
}

export class NewExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.NEW_EXPR, location);
  }
}

export class InstanceofExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.INSTANCEOF_EXPR, location);
  }
}

export class AsyncExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.ASYNC_EXPR, location);
  }
}

export class ArrayExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.ARRAY_EXPR, location);
  }
}

export class ObjectExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.OBJECT_EXPR, location);
  }
}

export class LiteralExpression extends Node {
  readonly value: Token;

  constructor(value: Token, location: TokenLocation) {
    super(SyntacticToken.LITERAL_EXPR, location);

    this.value = value;
  }
}
