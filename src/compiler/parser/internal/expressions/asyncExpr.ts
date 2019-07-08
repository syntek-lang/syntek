import { Node, Token, AsyncExpression } from '../../../../grammar';

import { Parser, Precedence } from '../../..';

export function asyncExpr(this: Parser, operator: Token): Node {
  this.eatWhitespace();

  const right = this.parsePrecedence(Precedence.OP10);

  return new AsyncExpression(right, {
    start: operator.location.start,
    end: right.location.end,
  });
}
