import {
  Node, Token, LexicalToken, WrappedExpression,
} from '../../../../grammar';

import { Parser } from '../../..';

export function wrappedExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  parser.eatWhitespace();

  const expr = parser.expression('Expected expression after "("');
  parser.eatWhitespace();

  parser.consume(LexicalToken.RPAR, 'Expected ")" after expression.');
  const end = parser.previous().location.end;

  return new WrappedExpression(expr, { start, end });
}
