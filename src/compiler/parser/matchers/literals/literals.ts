import { Node, Token, Expressions } from '../../..';

import { Matcher } from '../Matcher';

export function literals(this: Matcher, literal: Token): Node {
  return new Expressions.Literal(literal, literal.location);
}
