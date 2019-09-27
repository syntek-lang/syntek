import {
  Node, Token, LexicalToken, ArrayExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchExpressionList } from '../../parse-utils';

export function arrayExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.span.start;

  const content = matchExpressionList(parser, LexicalToken.R_SQB);
  return new ArrayExpression(content, new Span(start, parser.previous().span.end));
}
