import { Node, LexicalToken, MemberExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function memberExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const property = parser.match(LexicalToken.IDENTIFIER, LexicalToken.SUPER);

  if (!property) {
    throw parser.error('expr.member.identifier_super_after_dot', parser.peek().span);
  }

  return new MemberExpression(
    left,
    parser.previous(),
    new Span(left.span.start, parser.previous().span.end),
  );
}
