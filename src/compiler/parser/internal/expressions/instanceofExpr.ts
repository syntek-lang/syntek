import { Node, Token, InstanceofExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function instanceofExpr(parser: Parser, left: Node, operator: Token): Node {
  parser.eatWhitespace();

  const rule = parser.getRule(operator.type);
  const right = parser.parsePrecedence(rule.precedence + 1, 'expr.instanceof.expression_after_instanceof');

  return new InstanceofExpression(left, right, new Span(left.span.start, right.span.end));
}
