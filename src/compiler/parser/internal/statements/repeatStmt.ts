import { Node, LexicalToken, RepeatStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function repeatStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const amount = parser.expression();
  parser.eatWhitespace();

  parser.consume(LexicalToken.TIMES, 'Expected "times" after repeat');
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after times');

  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after times');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new RepeatStatement(amount, body, {
    start,
    end: parser.previous().location.end,
  });
}
