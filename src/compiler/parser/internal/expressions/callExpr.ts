import { Node, LexicalToken, CallExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { matchExpressionList } from '../../parse-utils';

export function callExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();

  const params = matchExpressionList(parser, LexicalToken.RPAR);

  return new CallExpression(left, params, new Span(left.span.start, parser.previous().span.end));
}
