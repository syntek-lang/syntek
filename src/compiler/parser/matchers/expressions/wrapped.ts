import {
  Node, Token, LexicalToken, Expressions,
} from '../../..';

import { Matcher } from '../Matcher';

export function wrapped(this: Matcher, prefix: Token): Node {
  const start = prefix.location.start;
  this.eatWhitespace();

  const expr = this.expression();
  this.eatWhitespace();

  this.consume(LexicalToken.RPAR, 'Expected ")" after expression.');
  const end = this.previous().location.end;

  return new Expressions.WrappedExpression(expr, { start, end });
}
