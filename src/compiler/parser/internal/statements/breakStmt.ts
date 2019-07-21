import { Node, LexicalToken, BreakStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function breakStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, 'stmt.break.newline_after_break');

  return new BreakStatement({
    start: parser.previous().location.start,
    end: parser.previous().location.end,
  });
}
