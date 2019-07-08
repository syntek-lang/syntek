import { Node, LexicalToken, MemberExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function memberExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const property = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier');

  return new MemberExpression(left, property, {
    start: left.location.start,
    end: property.location.end,
  });
}
