import { Node, Token, Super } from '../../../../grammar';

import { Parser } from '../../..';

export function superLiteral(this: Parser, literal: Token): Node {
  return new Super(literal.location);
}
