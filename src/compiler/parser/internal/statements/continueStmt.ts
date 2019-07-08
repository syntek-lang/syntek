import { Node, LexicalToken, ContinueStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function continueStmt(this: Parser): Node {
  this.consume(LexicalToken.NEWLINE, 'Expected newline after continue');

  return new ContinueStatement({
    start: this.previous().location.start,
    end: this.previous().location.end,
  });
}
