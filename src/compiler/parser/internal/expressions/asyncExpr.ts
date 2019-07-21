import { Node, Token, AsyncExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { Precedence } from '../../Precedence';

export function asyncExpr(parser: Parser, operator: Token): Node {
  parser.eatWhitespace();

  const right = parser.parsePrecedence(Precedence.OP10, 'expr.async.expression_after_async');

  return new AsyncExpression(right, new Span(operator.span.start, right.span.end));
}
