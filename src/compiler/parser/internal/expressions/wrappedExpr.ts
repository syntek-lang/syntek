import {
  Node, Token, LexicalToken, WrappedExpression,
} from '../../../../grammar';

import { Parser } from '../../..';

export function wrappedExpr(this: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  this.eatWhitespace();

  const expr = this.expression();
  this.eatWhitespace();

  this.consume(LexicalToken.RPAR, 'Expected ")" after expression.');
  const end = this.previous().location.end;

  return new WrappedExpression(expr, { start, end });
}
