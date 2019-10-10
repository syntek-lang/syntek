import {
  Token, Node, SyntacticToken, VariableType,
} from '..';
import { Span } from '../../position';

export class AssignmentExpression extends Node {
  readonly left: Node;

  readonly value: Node;

  constructor(left: Node, value: Node, span: Span) {
    super(SyntacticToken.ASSIGNMENT_EXPR, span);

    this.left = left;
    this.value = value;
  }
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

  readonly genericArgs: VariableType[];

  readonly params: Node[];

  constructor(object: Node, genericArgs: VariableType[], params: Node[], span: Span) {
    super(SyntacticToken.CALL_EXPR, span);

    this.object = object;
    this.genericArgs = genericArgs;
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

  readonly genericArgs: VariableType[];

  readonly params: Node[];

  constructor(object: Node, genericArgs: VariableType[], params: Node[], span: Span) {
    super(SyntacticToken.NEW_EXPR, span);

    this.object = object;
    this.genericArgs = genericArgs;
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

export class IfExpression extends Node {
  readonly condition: Node;

  readonly body: Node[];

  readonly elseClause: Node | null;

  readonly ifSpan: Span;

  constructor(condition: Node, body: Node[], elseClause: Node | null, span: Span) {
    super(SyntacticToken.IF_EXPR, span);

    this.condition = condition;
    this.body = body;
    this.elseClause = elseClause;

    const spanEnd = body.length
      ? body[body.length - 1].span.end
      : span.start;

    this.ifSpan = new Span(span.start, spanEnd);
  }
}

export class ElseExpression extends Node {
  readonly body: Node[];

  constructor(body: Node[], span: Span) {
    super(SyntacticToken.ELSE_EXPR, span);

    this.body = body;
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
