import { Node, LexicalToken, ThrowStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function throwStmt(this: Parser): Node {
  const start = this.previous().location.start;

  const expression = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after throw statement');

  this.syncIndentation();

  return new ThrowStatement(expression, {
    start,
    end: this.previous().location.end,
  });
}
