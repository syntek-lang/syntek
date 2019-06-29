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

    || node.type === SyntacticToken.IDENTIFIER
    || node.type === SyntacticToken.LITERAL
    || node.type === SyntacticToken.SUPER
    || node.type === SyntacticToken.THIS;
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
  readonly object: Node;

  readonly params: Node[];

  constructor(object: Node, params: Node[], location: TokenLocation) {
    super(SyntacticToken.CALL_EXPR, location);

    this.object = object;
    this.params = params;
  }
}

export class IndexExpression extends Node {
  readonly object: Node;

  readonly index: Node;

  constructor(object: Node, index: Node, location: TokenLocation) {
    super(SyntacticToken.INDEX_EXPR, location);

    this.object = object;
    this.index = index;
  }
}

export class MemberExpression extends Node {
  readonly object: Node;

  readonly property: Token;

  constructor(object: Node, property: Token, location: TokenLocation) {
    super(SyntacticToken.MEMBER_EXPR, location);

    this.object = object;
    this.property = property;
  }
}

export class NewExpression extends Node {
  readonly object: Node;

  readonly params: Node[];

  constructor(object: Node, params: Node[], location: TokenLocation) {
    super(SyntacticToken.NEW_EXPR, location);

    this.object = object;
    this.params = params;
  }
}

export class InstanceofExpression extends Node {
  readonly left: Node;

  readonly right: Node;

  constructor(left: Node, right: Node, location: TokenLocation) {
    super(SyntacticToken.INSTANCEOF_EXPR, location);

    this.left = left;
    this.right = right;
  }
}

export class AsyncExpression extends Node {
  readonly expression: Node;

  constructor(expression: Node, location: TokenLocation) {
    super(SyntacticToken.ASYNC_EXPR, location);

    this.expression = expression;
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

export class Identifier extends Node {
  readonly identifier: Token;

  constructor(identifier: Token, location: TokenLocation) {
    super(SyntacticToken.IDENTIFIER, location);

    this.identifier = identifier;
  }
}

export class Literal extends Node {
  readonly value: Token;

  constructor(value: Token, location: TokenLocation) {
    super(SyntacticToken.LITERAL, location);

    this.value = value;
  }
}

export class Super extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.SUPER, location);
  }
}

export class This extends Node {
  constructor(location: TokenLocation) {
    super(SyntacticToken.THIS, location);
  }
}
