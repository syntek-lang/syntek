import { Node, LexicalToken, Expressions } from '../../..';

import { Matcher } from '../Matcher';

export function member(this: Matcher, left: Node): Node {
  this.eatWhitespace();
  const property = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier');

  return new Expressions.MemberExpression(left, property, {
    start: left.location.start,
    end: property.location.end,
  });
}
