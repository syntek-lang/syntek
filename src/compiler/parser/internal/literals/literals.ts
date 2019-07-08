import { Node, Token, Literal } from '../../../../grammar';

import { Parser } from '../../..';

export function literals(this: Parser, literal: Token): Node {
  return new Literal(literal, literal.location);
}
