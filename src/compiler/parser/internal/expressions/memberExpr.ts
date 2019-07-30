import {
  Node, Token, LexicalToken, MemberExpression,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function memberExpr(parser: Parser, left: Node, operator: Token): Node {
  parser.eatWhitespace();
  const property = parser.match(LexicalToken.IDENTIFIER, LexicalToken.SUPER);

  if (!property) {
    throw parser.error("Expected an identifier or 'super' after '.'", parser.peek().span, (error) => {
      error.info("Add an identifier or 'super' after this '.'", operator.span);
    });
  }

  return new MemberExpression(
    left,
    parser.previous(),
    new Span(left.span.start, parser.previous().span.end),
  );
}
