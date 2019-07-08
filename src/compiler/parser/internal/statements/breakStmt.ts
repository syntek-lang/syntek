import { Node, LexicalToken, BreakStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function breakStmt(this: Parser): Node {
  this.consume(LexicalToken.NEWLINE, 'Expected newline after break');

  return new BreakStatement({
    start: this.previous().location.start,
    end: this.previous().location.end,
  });
}
