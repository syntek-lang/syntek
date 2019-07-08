import { Node, Token, UnaryExpression } from '../../../../grammar';

import { Parser, Precedence } from '../../..';

export function unaryExpr(parser: Parser, operator: Token): Node {
  parser.eatWhitespace();

  const right = parser.parsePrecedence(Precedence.OP10);

  return new UnaryExpression(operator, right, {
    start: operator.location.start,
    end: right.location.end,
  });
}
