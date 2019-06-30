import { Node, LexicalToken, Expressions } from '../../..';

import { Matcher } from '../Matcher';

export function index(this: Matcher, left: Node): Node {
  this.eatWhitespace();
  const indexExpr = this.expression();

  this.eatWhitespace();
  this.consume(LexicalToken.RSQB, 'Expected "]"');

  return new Expressions.IndexExpression(left, indexExpr, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
