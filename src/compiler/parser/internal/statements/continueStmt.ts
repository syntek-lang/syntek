import { Node, LexicalToken, ContinueStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function continueStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after continue');

  return new ContinueStatement({
    start: parser.previous().location.start,
    end: parser.previous().location.end,
  });
}
