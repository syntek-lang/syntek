import { Node, Token, Expressions } from '../../..';

import { Matcher } from '../Matcher';
import { Precedence } from '../Precedence';

// eslint-disable-next-line no-underscore-dangle
export function async_(this: Matcher, operator: Token): Node {
  this.eatWhitespace();

  const right = this.parsePrecedence(Precedence.OP10);

  return new Expressions.AsyncExpression(right, {
    start: operator.location.start,
    end: right.location.end,
  });
}
