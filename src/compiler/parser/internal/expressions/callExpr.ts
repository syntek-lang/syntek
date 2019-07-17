import { Node, LexicalToken, CallExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { matchExpressionList } from '../../ParseUtils';

export function callExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();

  const params = matchExpressionList(parser, LexicalToken.RPAR);

  return new CallExpression(left, params, {
    start: left.location.start,
    end: parser.previous().location.end,
  });
}
