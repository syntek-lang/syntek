import {
  Node, Token, LexicalToken, Expressions,
} from '../../..';

import { Parser } from '../../Parser';

export function objectExpr(this: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  this.eatWhitespace();

  const props: Node[] = [];
  while (!this.match(LexicalToken.RBRACE)) {
    props.push(this.declaration());
  }

  return new Expressions.ObjectExpression(props, {
    start,
    end: this.previous().location.end,
  });
}
