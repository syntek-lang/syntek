import {
  Node, Token, LexicalToken, ArrayExpression,
} from '../../../../grammar';

import { Parser, ParseUtils } from '../../..';

export function arrayExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  parser.eatWhitespace();

  const content = ParseUtils.matchExpressionList(parser, LexicalToken.RSQB);
  return new ArrayExpression(content, {
    start,
    end: parser.previous().location.end,
  });
}
