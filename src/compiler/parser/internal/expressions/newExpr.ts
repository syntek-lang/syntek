import {
  Node, Token, LexicalToken, NewExpression,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Precedence } from '../../Precedence';
import { matchExpressionList } from '../../ParseUtils';

import { memberExpr } from './memberExpr';

export function newExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  parser.eatWhitespace();

  let object = parser.parsePrecedence(Precedence.OP12, 'Expected expression after "new"');
  parser.eatWhitespace();

  while (parser.match(LexicalToken.DOT)) {
    object = memberExpr(parser, object);
  }

  parser.eatWhitespace();
  parser.consume(LexicalToken.LPAR, 'Expected "("');
  const params = matchExpressionList(parser, LexicalToken.RPAR);

  return new NewExpression(object, params, {
    start,
    end: parser.previous().location.end,
  });
}
