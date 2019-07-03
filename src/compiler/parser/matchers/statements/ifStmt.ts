import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function ifStmt(this: Parser): Node {
  const start = this.previous().location.start;

  const condition = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after if');

  this.syncIndentation();
  this.consume(LexicalToken.INDENT, 'Expected indent after if');

  const body: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    body.push(this.declaration());
  }

  return new Statements.IfStatement(condition, body, {
    start,
    end: this.previous().location.end,
  });
}
