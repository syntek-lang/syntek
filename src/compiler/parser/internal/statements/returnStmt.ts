import { Node, LexicalToken, ReturnStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function returnStmt(parser: Parser): Node {
  const start = parser.previous().location.start;

  let expression: Node | null = null;
  if (!parser.match(LexicalToken.NEWLINE)) {
    expression = parser.expression('Expected expression or newline after "return"');
    parser.consume(LexicalToken.NEWLINE, 'Expected newline after return statement');
  }

  parser.syncIndentation();

  return new ReturnStatement(expression, {
    start,
    end: parser.previous().location.end,
  });
}
