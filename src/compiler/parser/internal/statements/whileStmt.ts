import { Node, LexicalToken, WhileStatement } from '../../../../grammar';

import { Parser } from '../../..';

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

  return new WhileStatement(condition, body, {
    start,
    end: this.previous().location.end,
  });
}
