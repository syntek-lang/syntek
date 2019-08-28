import { Token, Node, SyntacticToken } from '..';
import { Span } from '../../position';

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
    || node.type === SyntacticToken.ASSIGNMENT_EXPR

    || node.type === SyntacticToken.IDENTIFIER
    || node.type === SyntacticToken.LITERAL
    || node.type === SyntacticToken.SUPER
    || node.type === SyntacticToken.THIS;
}

export class WrappedExpression extends Node {
  readonly expression: Node;

  constructor(expression: Node, span: Span) {
    super(SyntacticToken.WRAPPED_EXPR, span);

    this.expression = expression;
  }
}

export class UnaryExpression extends Node {
  readonly operator: Token;

  readonly right: Node;

  constructor(operator: Token, right: Node, span: Span) {
    super(SyntacticToken.UNARY_EXPR, span);

    this.operator = operator;
    this.right = right;
  }
}

export class BinaryExpression extends Node {
  readonly left: Node;

  readonly operator: Token;

  readonly right: Node;

  constructor(left: Node, operator: Token, right: Node, span: Span) {
    super(SyntacticToken.BINARY_EXPR, span);

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

export class CallExpression extends Node {
  readonly object: Node;

  readonly params: Node[];

  constructor(object: Node, params: Node[], span: Span) {
    super(SyntacticToken.CALL_EXPR, span);

    this.object = object;
    this.params = params;
  }
}

export class IndexExpression extends Node {
  readonly object: Node;

  readonly index: Node;

  constructor(object: Node, index: Node, span: Span) {
    super(SyntacticToken.INDEX_EXPR, span);

    this.object = object;
    this.index = index;
  }
}

export class MemberExpression extends Node {
  readonly object: Node;

  readonly property: Token;

  constructor(object: Node, property: Token, span: Span) {
    super(SyntacticToken.MEMBER_EXPR, span);

    this.object = object;
    this.property = property;
  }
}

export class NewExpression extends Node {
  readonly object: Node;

  readonly params: Node[];

  constructor(object: Node, params: Node[], span: Span) {
    super(SyntacticToken.NEW_EXPR, span);

    this.object = object;
    this.params = params;
  }
}

export class InstanceofExpression extends Node {
  readonly left: Node;

  readonly right: Node;

  constructor(left: Node, right: Node, span: Span) {
    super(SyntacticToken.INSTANCEOF_EXPR, span);

    this.left = left;
    this.right = right;
  }
}

export class AsyncExpression extends Node {
  readonly expression: Node;

  constructor(expression: Node, span: Span) {
    super(SyntacticToken.ASYNC_EXPR, span);

    this.expression = expression;
  }
}

export class ArrayExpression extends Node {
  readonly content: Node[];

  constructor(content: Node[], span: Span) {
    super(SyntacticToken.ARRAY_EXPR, span);

    this.content = content;
  }
}

export class AssignmentExpression extends Node {
  readonly left: Node;

  readonly value: Node;

  constructor(left: Node, value: Node, span: Span) {
    super(SyntacticToken.ASSIGNMENT_EXPR, span);

    this.left = left;
    this.value = value;
  }
}

export class Identifier extends Node {
  readonly lexeme: string;

  constructor(identifier: Token, span?: Span) {
    super(SyntacticToken.IDENTIFIER, span || identifier.span);

    this.lexeme = identifier.lexeme;
  }
}

export class Literal extends Node {
  readonly value: Token;

  constructor(value: Token, span: Span) {
    super(SyntacticToken.LITERAL, span);

    this.value = value;
  }
}

export class Super extends Node {
  constructor(span: Span) {
    super(SyntacticToken.SUPER, span);
  }
}

export class This extends Node {
  constructor(span: Span) {
    super(SyntacticToken.THIS, span);
  }
}
