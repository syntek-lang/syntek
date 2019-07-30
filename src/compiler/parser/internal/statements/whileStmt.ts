import { Node, LexicalToken, WhileStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function whileStmt(parser: Parser): Node {
  const whileSpan = parser.previous().span;
  parser.eatWhitespace();

  const condition = parser.expression("Expected a condition after 'while'", (error) => {
    error.info('Add an expression after this while', whileSpan);
  });

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline and indent after the while statement', (error) => {
    error.info('Add a newline after the condition', condition.span);
  });
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected a newline and indent after the while statement', (error) => {
    error.info('Add an indent after the condition', condition.span);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new WhileStatement(condition, body, new Span(whileSpan.start, parser.previous().span.end));
}
