import { Node, Token, Expressions } from '../../..';

import { Parser } from '../../Parser';

export function superLiteral(this: Parser, literal: Token): Node {
  return new Expressions.Super(literal.location);
}
