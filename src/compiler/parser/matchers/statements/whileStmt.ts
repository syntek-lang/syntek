import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function whileStmt(this: Parser): Node {
  const start = this.previous().location.start;

  const condition = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after while');

  this.syncIndentation();
  this.consume(LexicalToken.INDENT, 'Expected indent after while');

  const body: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    body.push(this.declaration());
  }

  return new Statements.WhileStatement(condition, body, {
    start,
    end: this.previous().location.end,
  });
}
