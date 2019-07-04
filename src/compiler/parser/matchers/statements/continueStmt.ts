import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function continueStmt(this: Parser): Node {
  this.consume(LexicalToken.NEWLINE, 'Expected newline after continue');

  return new Statements.ContinueStatement({
    start: this.previous().location.start,
    end: this.previous().location.end,
  });
}
