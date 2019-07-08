import { Node, LexicalToken, IndexExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function indexExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const expr = parser.expression();

  parser.eatWhitespace();
  parser.consume(LexicalToken.RSQB, 'Expected "]"');

  return new IndexExpression(left, expr, {
    start: left.location.start,
    end: parser.previous().location.end,
  });
}
