import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function breakStmt(this: Parser): Node {
  this.consume(LexicalToken.NEWLINE, 'Expected newline after break');

  return new Statements.BreakStatement({
    start: this.previous().location.start,
    end: this.previous().location.end,
  });
}
