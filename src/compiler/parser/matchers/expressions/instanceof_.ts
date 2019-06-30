import { Node, Token, Expressions } from '../../..';

import { Matcher } from '../Matcher';

// eslint-disable-next-line no-underscore-dangle
export function instanceof_(this: Matcher, left: Node, operator: Token): Node {
  this.eatWhitespace();

  const rule = this.getRule(operator.type);
  const right = this.parsePrecedence(rule.precedence + 1);

  return new Expressions.InstanceofExpression(left, right, {
    start: left.location.start,
    end: right.location.end,
  });
}
