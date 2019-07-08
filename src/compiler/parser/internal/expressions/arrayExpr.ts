import {
  Node, Token, LexicalToken, ArrayExpression,
} from '../../../../grammar';

import { Parser, ParseUtils } from '../../..';

export function arrayExpr(this: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  this.eatWhitespace();

  const content = ParseUtils.matchExpressionList.call(this, LexicalToken.RSQB);
  return new ArrayExpression(content, {
    start,
    end: this.previous().location.end,
  });
}
