import {
  Node, Token, LexicalToken, WrappedExpression,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function wrappedExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.span.start;
  parser.eatWhitespace();

  const expr = parser.expression("Expected an expression after '('", (error) => {
    error.info('Add an expression after this (', prefix.span);
  });
  parser.eatWhitespace();

  parser.consume(LexicalToken.RPAR, "Expected ')' after expression", (error) => {
    error.info("Add a ')' after the expression", expr.span);
  });
  const end = parser.previous().span.end;

  return new WrappedExpression(expr, new Span(start, end));
}
