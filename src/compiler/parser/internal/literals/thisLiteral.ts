import { Node, Token, This } from '../../../../grammar';

import { Parser } from '../../..';

export function thisLiteral(this: Parser, literal: Token): Node {
  return new This(literal.location);
}
