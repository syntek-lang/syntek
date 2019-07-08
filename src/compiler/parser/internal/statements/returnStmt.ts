import { Node, LexicalToken, ReturnStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function returnStmt(this: Parser): Node {
  const start = this.previous().location.start;

  let expression: Node | null = null;
  if (!this.match(LexicalToken.NEWLINE)) {
    expression = this.expression();
    this.consume(LexicalToken.NEWLINE, 'Expected newline after return statement');
  }

  this.syncIndentation();

  return new ReturnStatement(expression, {
    start,
    end: this.previous().location.end,
  });
}
