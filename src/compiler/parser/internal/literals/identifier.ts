import { Node, Token, Identifier } from '../../../../grammar';

import { Parser } from '../../..';

export function identifier(_parser: Parser, literal: Token): Node {
  return new Identifier(literal, literal.span);
}
