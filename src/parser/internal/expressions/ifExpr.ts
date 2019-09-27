import {
  Node, LexicalToken, IfExpression, ElseExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchBlock } from '../../parse-utils';

export function ifExpr(parser: Parser): Node {
  const ifSpan = parser.previous().span;

  parser.ignoreNewline();

  const condition = parser.expression("Expected a condition after 'if'", (error) => {
    error.info('Add an expression after this if', ifSpan);
  });

  const body = matchBlock(parser);

  let elseClause: Node | null = null;
  if (parser.matchIgnoreNewline(LexicalToken.ELSE)) {
    if (parser.matchIgnoreNewline(LexicalToken.IF)) {
      elseClause = ifExpr(parser);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      elseClause = elseExpr(parser);
    }
  }

  return new IfExpression(
    condition,
    body,
    elseClause,
    new Span(ifSpan.start, parser.previous().span.end),
  );
}

function elseExpr(parser: Parser): Node {
  const elseSpan = parser.previous().span;

  const body = matchBlock(parser);

  return new ElseExpression(body, new Span(elseSpan.start, parser.previous().span.end));
}
