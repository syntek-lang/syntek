import { Node, LexicalToken, ContinueStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function continueStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, 'stmt.continue.newline_after_continue');

  return new ContinueStatement(new Span(parser.previous().span.start, parser.previous().span.end));
}
