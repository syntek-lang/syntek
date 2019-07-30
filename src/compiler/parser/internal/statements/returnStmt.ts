import { Node, LexicalToken, ReturnStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function returnStmt(parser: Parser): Node {
  const start = parser.previous().span.start;

  let expression: Node | null = null;
  if (!parser.match(LexicalToken.NEWLINE)) {
    expression = parser.expression("Expected a newline or expression after 'return'", (error) => {
      error.info('Add a newline or expression after this return', parser.previous().span);
    });

    parser.consume(LexicalToken.NEWLINE, 'Expected a newline after the return statement', (error) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      error.info('Add a newline after the return value', expression!.span);
    });
  }

  parser.syncIndentation();

  return new ReturnStatement(expression, new Span(start, parser.previous().span.end));
}
