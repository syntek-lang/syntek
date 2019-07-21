import {
  Node, Token, LexicalToken, ObjectExpression,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function objectExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.span.start;
  const props: Node[] = [];

  if (parser.peekIgnoreWhitespace().type === LexicalToken.RBRACE) {
    parser.eatWhitespace();
    parser.advance();
  } else {
    parser.consume(LexicalToken.NEWLINE, 'expr.object.newline_indent_after_lbrace');
    parser.consume(LexicalToken.INDENT, 'expr.object.newline_indent_after_lbrace');

    while (!parser.match(LexicalToken.OUTDENT)) {
      props.push(parser.declaration());
    }

    parser.consume(LexicalToken.RBRACE, 'expr.object.rbrace_after_outdent');
  }

  return new ObjectExpression(props, new Span(start, parser.previous().span.end));
}
