import { Node, Token, AsyncExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Precedence } from '../../Precedence';

export function asyncExpr(parser: Parser, operator: Token): Node {
  parser.eatWhitespace();

  const right = parser.parsePrecedence(Precedence.OP10);

  return new AsyncExpression(right, {
    start: operator.location.start,
    end: right.location.end,
  });
}
