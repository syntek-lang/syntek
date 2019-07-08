import {
  Node, Token, LexicalToken, ObjectExpression,
} from '../../../../grammar';

import { Parser } from '../../..';

export function objectExpr(this: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  this.eatWhitespace();

  const props: Node[] = [];
  while (!this.match(LexicalToken.RBRACE)) {
    props.push(this.declaration());
  }

  return new ObjectExpression(props, {
    start,
    end: this.previous().location.end,
  });
}
