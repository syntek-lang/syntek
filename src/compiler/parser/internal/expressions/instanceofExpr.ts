import { Node, Token, InstanceofExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { Precedence } from '../../Precedence';

export function instanceofExpr(parser: Parser, left: Node, operator: Token): Node {
  parser.eatWhitespace();

  const right = parser.parsePrecedence(Precedence.OP7, "Expected an expression after 'instanceof'", (error) => {
    error.info('Add an expression after this instanceof', operator.span);
  });

  return new InstanceofExpression(left, right, new Span(left.span.start, right.span.end));
}
