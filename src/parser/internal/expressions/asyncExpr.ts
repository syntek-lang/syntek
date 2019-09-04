import { Node, Token, AsyncExpression } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function asyncExpr(parser: Parser, operator: Token): Node {
  parser.eatWhitespace();

  const right = parser.parsePrecedence(parser.getRule(operator.type).precedence, "Expected an expression after 'async'", (error) => {
    error.info('Add an expression after this async', operator.span);
  });

  return new AsyncExpression(right, new Span(operator.span.start, right.span.end));
}
