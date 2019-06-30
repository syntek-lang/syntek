import { Node, Token, Expressions } from '../../..';

import { Matcher } from '../Matcher';

// eslint-disable-next-line no-underscore-dangle
export function this_(this: Matcher, literal: Token): Node {
  return new Expressions.This(literal.location);
}
