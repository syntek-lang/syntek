import {
  Node, Token, LexicalToken, ObjectExpression,
} from '../../../../grammar';

import { Parser } from '../../..';

export function objectExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  const props: Node[] = [];

  if (parser.peekIgnoreWhitespace().type === LexicalToken.RBRACE) {
    parser.eatWhitespace();
    parser.advance();
  } else {
    parser.consume(LexicalToken.NEWLINE, 'Expected newline after "{"');
    parser.consume(LexicalToken.INDENT, 'Expected indent after "{"');

    while (!parser.match(LexicalToken.OUTDENT)) {
      props.push(parser.declaration());
    }

    parser.consume(LexicalToken.RBRACE, 'Expected after outdent');
  }

  return new ObjectExpression(props, {
    start,
    end: parser.previous().location.end,
  });
}
