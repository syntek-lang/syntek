import { Node, LexicalToken, MemberExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function memberExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const property = parser.match(LexicalToken.IDENTIFIER, LexicalToken.SUPER);

  if (!property) {
    throw new Error('Expected identifier or super');
  }

  return new MemberExpression(left, parser.previous(), {
    start: left.location.start,
    end: parser.previous().location.end,
  });
}
