import { Node, LexicalToken, RepeatStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function repeatStmt(parser: Parser): Node {
  const repeatSpan = parser.previous().span;
  parser.eatWhitespace();

  const amount = parser.expression("Expected an amount after 'repeat'", (error) => {
    error.info('Add an expression after this repeat', repeatSpan);
  });
  parser.eatWhitespace();

  const timesSpan = parser.consume(LexicalToken.TIMES, "Expected 'times' after the amount", (error) => {
    error.info("Add 'times' after the amount", amount.span);
  }).span;

  parser.consume(LexicalToken.NEWLINE, "Expected a newline and indent after 'times'", (error) => {
    error.info('Add a newline after this times', timesSpan);
  });
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, "Expected a newline and indent after 'times'", (error) => {
    error.info('Add an indent after this times', timesSpan);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new RepeatStatement(amount, body, new Span(repeatSpan.start, parser.previous().span.end));
}
