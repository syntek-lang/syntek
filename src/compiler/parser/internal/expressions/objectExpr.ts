import {
  Node, Token, LexicalToken, ObjectExpression,
} from '../../../../grammar';

import { Parser } from '../../..';

export function objectExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  parser.eatWhitespace();

  const props: Node[] = [];
  while (!parser.match(LexicalToken.RBRACE)) {
    props.push(parser.declaration());
  }

  return new ObjectExpression(props, {
    start,
    end: parser.previous().location.end,
  });
}
