import { Node, WhileStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchBlock } from '../../parse-utils';

export function whileStmt(parser: Parser): Node {
  const whileSpan = parser.previous().span;

  parser.ignoreNewline();

  const condition = parser.expression("Expected a condition after 'while'", (error) => {
    error.info('Add an expression after this while', whileSpan);
  });

  const body = matchBlock(parser);

  return new WhileStatement(condition, body, new Span(whileSpan.start, parser.previous().span.end));
}
