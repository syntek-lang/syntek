import { Node, Token, Expressions } from '../../..';

import { Matcher } from '../Matcher';
import { Precedence } from '../Precedence';

export function unary(this: Matcher, operator: Token): Node {
  this.eatWhitespace();

  const right = this.parsePrecedence(Precedence.OP10);

  return new Expressions.UnaryExpression(operator, right, {
    start: operator.location.start,
    end: right.location.end,
  });
}
