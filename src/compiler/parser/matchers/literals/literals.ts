import { Node, Token, Expressions } from '../../..';

import { Parser } from '../../Parser';

export function literals(this: Parser, literal: Token): Node {
  return new Expressions.Literal(literal, literal.location);
}
