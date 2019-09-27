import { Node, LexicalToken, IndexExpression } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function indexExpr(parser: Parser, left: Node): Node {
  parser.ignoreNewline();

  const expr = parser.expression("Expected an expression after '['", (error) => {
    error.info('Add an expression after this [', left.span);
  });

  parser.ignoreNewline();

  parser.consume(LexicalToken.R_SQB, "Expected ']' after the expression", (error) => {
    error.info("Add a ']' after this expression", expr.span);
  });

  return new IndexExpression(left, expr, new Span(left.span.start, parser.previous().span.end));
}
