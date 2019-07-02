import { Node, Token, Expressions } from '../../..';

import { Parser } from '../../Parser';

// eslint-disable-next-line no-underscore-dangle
export function super_(this: Parser, literal: Token): Node {
  return new Expressions.Super(literal.location);
}
