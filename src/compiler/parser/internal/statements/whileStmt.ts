import { Node, LexicalToken, WhileStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function whileStmt(parser: Parser): Node {
  const start = parser.previous().span.start;
  parser.eatWhitespace();

  const condition = parser.expression('stmt.while.expression_after_while"');

  parser.consume(LexicalToken.NEWLINE, 'stmt.while.newline_indent_after_while_stmt');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'stmt.while.newline_indent_after_while_stmt');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new WhileStatement(condition, body, new Span(start, parser.previous().span.end));
}
