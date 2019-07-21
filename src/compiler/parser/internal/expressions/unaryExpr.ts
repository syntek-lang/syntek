import { Node, Token, UnaryExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { Precedence } from '../../Precedence';

export function unaryExpr(parser: Parser, operator: Token): Node {
  parser.eatWhitespace();

  const right = parser.parsePrecedence(Precedence.OP10, 'expr.unary.expression_after_operator');

  return new UnaryExpression(operator, right, new Span(operator.span.start, right.span.end));
}
