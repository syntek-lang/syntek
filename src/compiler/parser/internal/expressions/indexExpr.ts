import { Node, LexicalToken, IndexExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function indexExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const expr = parser.expression('expr.index.expression_after_lsqb');

  parser.eatWhitespace();
  parser.consume(LexicalToken.RSQB, 'expr.index.rsqb_after_expression');

  return new IndexExpression(left, expr, {
    start: left.location.start,
    end: parser.previous().location.end,
  });
}
