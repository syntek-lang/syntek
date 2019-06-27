import { Node, SyntacticToken, TokenLocation } from '../..';

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
    || node.type === SyntacticToken.OBJECT_EXPR;
}

export class WrappedExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.WRAPPED_EXPR, location);
  }
}

export class UnaryExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.UNARY_EXPR, location);
  }
}

export class BinaryExpression extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.BINARY_EXPR, location);
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
