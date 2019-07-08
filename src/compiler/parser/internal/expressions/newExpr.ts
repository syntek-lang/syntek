import {
  Node, Token, LexicalToken, MemberExpression, NewExpression,
} from '../../../../grammar';

import { Parser, ParseUtils, Precedence } from '../../..';

export function newExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  parser.eatWhitespace();

  let object = parser.parsePrecedence(Precedence.OP12);
  parser.eatWhitespace();

  while (parser.match(LexicalToken.DOT)) {
    const property = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier');

    object = new MemberExpression(object, property, {
      start: object.location.start,
      end: property.location.end,
    });
  }

  parser.eatWhitespace();
  parser.consume(LexicalToken.LPAR, 'Expected "("');
  const params = ParseUtils.matchExpressionList(parser, LexicalToken.RPAR);

  return new NewExpression(object, params, {
    start,
    end: parser.previous().location.end,
  });
}
