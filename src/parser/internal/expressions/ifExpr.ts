import {
  Node, LexicalToken, IfExpression, ElseExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function ifExpr(parser: Parser): Node {
  const ifSpan = parser.previous().span;

  const condition = parser.expression("Expected a condition after 'if'", (error) => {
    error.info('Add an expression after this if', ifSpan);
  });

  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const body: Node[] = [];
  while (!parser.match(LexicalToken.R_BRACE)) {
    body.push(parser.declaration());
  }

  let elseClause: Node | null = null;
  if (parser.match(LexicalToken.ELSE)) {
    if (parser.match(LexicalToken.IF)) {
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

  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const body: Node[] = [];
  while (!parser.match(LexicalToken.R_BRACE)) {
    body.push(parser.declaration());
  }

  return new ElseExpression(body, new Span(elseSpan.start, parser.previous().span.end));
}
