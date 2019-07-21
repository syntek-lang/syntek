import { Node, LexicalToken, IndexExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function indexExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const expr = parser.expression('expr.index.expression_after_lsqb');

  parser.eatWhitespace();
  parser.consume(LexicalToken.RSQB, 'expr.index.rsqb_after_expression');

  return new IndexExpression(left, expr, new Span(left.span.start, parser.previous().span.end));
}
