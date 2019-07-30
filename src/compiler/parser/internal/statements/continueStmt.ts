import { Node, LexicalToken, ContinueStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function continueStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, "Expectd a newline after 'continue'", (error) => {
    error.info('Add a newline after this continue', parser.previous().span);
  });

  return new ContinueStatement(new Span(parser.previous().span.start, parser.previous().span.end));
}
