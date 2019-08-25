import { Node, Token, Super } from '../../../grammar';

import { Parser } from '../..';

export function superLiteral(_parser: Parser, literal: Token): Node {
  return new Super(literal.span);
}
