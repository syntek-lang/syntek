import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function throwStmt(this: Parser): Node {
  const start = this.previous().location.start;

  const expression = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after throw statement');

  this.syncIndentation();

  return new Statements.ThrowStatement(expression, {
    start,
    end: this.previous().location.end,
  });
}
