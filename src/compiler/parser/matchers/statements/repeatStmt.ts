import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function repeatStmt(this: Parser): Node {
  const start = this.previous().location.start;

  const amount = this.expression();
  this.eatWhitespace();

  this.consume(LexicalToken.TIMES, 'Expected "times" after repeat');
  this.consume(LexicalToken.NEWLINE, 'Expected newline after times');

  this.syncIndentation();
  this.consume(LexicalToken.INDENT, 'Expected indent after times');

  const body: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    body.push(this.declaration());
  }

  return new Statements.RepeatStatement(amount, body, {
    start,
    end: this.previous().location.end,
  });
}
