import { Node, LexicalToken, WhileStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function whileStmt(parser: Parser): Node {
  const whileSpan = parser.previous().span;

  const condition = parser.expression("Expected a condition after 'while'", (error) => {
    error.info('Add an expression after this while', whileSpan);
  });

  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const body: Node[] = [];
  while (!parser.match(LexicalToken.R_BRACE)) {
    body.push(parser.declaration());
  }

  return new WhileStatement(condition, body, new Span(whileSpan.start, parser.previous().span.end));
}
