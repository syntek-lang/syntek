import {
  Node, Token, LexicalToken, ArrayExpression,
} from '../../../../grammar';

import { Parser } from '../../..';
import { matchExpressionList } from '../../parse-utils';

export function arrayExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.location.start;

  const content = matchExpressionList(parser, LexicalToken.RSQB);
  return new ArrayExpression(content, {
    start,
    end: parser.previous().location.end,
  });
}
