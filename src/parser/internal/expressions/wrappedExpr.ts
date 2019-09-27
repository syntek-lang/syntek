import {
  Node, Token, LexicalToken, WrappedExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function wrappedExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.span.start;

  const expr = parser.expression("Expected an expression after '('", (error) => {
    error.info('Add an expression after this (', prefix.span);
  });

  parser.consume(LexicalToken.R_PAR, "Expected ')' after expression", (error) => {
    error.info("Add a ')' after the expression", expr.span);
  });
  const end = parser.previous().span.end;

  return new WrappedExpression(expr, new Span(start, end));
}
