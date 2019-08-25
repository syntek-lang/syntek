import { Node, Token, Literal } from '../../../grammar';

import { Parser } from '../..';

export function literals(_parser: Parser, literal: Token): Node {
  return new Literal(literal, literal.span);
}
