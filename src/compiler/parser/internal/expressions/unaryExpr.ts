import { Node, Token, UnaryExpression } from '../../../../grammar';

import { Parser, Precedence } from '../../..';

export function unaryExpr(this: Parser, operator: Token): Node {
  this.eatWhitespace();

  const right = this.parsePrecedence(Precedence.OP10);

  return new UnaryExpression(operator, right, {
    start: operator.location.start,
    end: right.location.end,
  });
}
