import { Node, Token, This } from '../../../../grammar';

import { Parser } from '../../..';

export function thisLiteral(_parser: Parser, literal: Token): Node {
  return new This(literal.span);
}
