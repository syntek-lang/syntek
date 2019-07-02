import { Node, Token, Expressions } from '../../..';

import { Parser } from '../../Parser';

// eslint-disable-next-line no-underscore-dangle
export function this_(this: Parser, literal: Token): Node {
  return new Expressions.This(literal.location);
}
