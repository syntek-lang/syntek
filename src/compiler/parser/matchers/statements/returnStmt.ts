import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function returnStmt(this: Parser): Node {
  const start = this.previous().location.start;

  let expression: Node | null = null;
  if (!this.match(LexicalToken.NEWLINE)) {
    expression = this.expression();
    this.consume(LexicalToken.NEWLINE, 'Expected newline after return statement');
  }

  this.syncIndentation();

  return new Statements.ReturnStatement(expression, {
    start,
    end: this.previous().location.end,
  });
}
