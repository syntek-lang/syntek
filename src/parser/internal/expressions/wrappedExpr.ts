import {
  Node, Token, LexicalToken, WrappedExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function wrappedExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.span.start;

  const ignoreAllNewlines = parser.ignoreAllNewlines;
  parser.ignoreAllNewlines = true; // eslint-disable-line no-param-reassign

  parser.ignoreNewline();

  const expr = parser.expression("Expected an expression after '('", (error) => {
    error.info('Add an expression after this (', prefix.span);
  });

  parser.ignoreNewline();

  parser.consume(LexicalToken.R_PAR, "Expected ')' after expression", (error) => {
    error.info("Add a ')' after the expression", expr.span);
  });

  parser.ignoreAllNewlines = ignoreAllNewlines; // eslint-disable-line no-param-reassign

  return new WrappedExpression(expr, new Span(start, parser.previous().span.end));
}
