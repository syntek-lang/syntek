import { Node, LexicalToken, BreakStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function breakStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, "Expected a newline after 'break'", (error) => {
    error.info('Add a newline after this break', parser.previous().span);
  });

  return new BreakStatement(new Span(parser.previous().span.start, parser.previous().span.end));
}
