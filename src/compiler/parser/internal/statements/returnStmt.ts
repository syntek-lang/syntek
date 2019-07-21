import { Node, LexicalToken, ReturnStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function returnStmt(parser: Parser): Node {
  const start = parser.previous().span.start;

  let expression: Node | null = null;
  if (!parser.match(LexicalToken.NEWLINE)) {
    expression = parser.expression('stmt.return.newline_expression_after_return');
    parser.consume(LexicalToken.NEWLINE, 'stmt.return.newline_after_return_stmt');
  }

  parser.syncIndentation();

  return new ReturnStatement(expression, new Span(start, parser.previous().span.end));
}
