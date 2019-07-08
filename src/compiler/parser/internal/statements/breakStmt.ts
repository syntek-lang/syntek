import { Node, LexicalToken, BreakStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function breakStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after break');

  return new BreakStatement({
    start: parser.previous().location.start,
    end: parser.previous().location.end,
  });
}
