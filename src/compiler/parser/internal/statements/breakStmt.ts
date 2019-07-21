import { Node, LexicalToken, BreakStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function breakStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, 'stmt.break.newline_after_break');

  return new BreakStatement(new Span(parser.previous().span.start, parser.previous().span.end));
}
