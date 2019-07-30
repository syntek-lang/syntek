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
    parser.consume(LexicalToken.NEWLINE, "Expected a newline and indent after '{'", (error) => {
      error.info('Add a newline after the {', prefix.span);
    });
    parser.consume(LexicalToken.INDENT, "Expected a newline and indent after '{'", (error) => {
      error.info('Add an indent after the {', prefix.span);
    });

    while (!parser.match(LexicalToken.OUTDENT)) {
      props.push(parser.declaration());
    }

    parser.consume(LexicalToken.RBRACE, "Expected '}' at the end of object", (error) => {
      error.info("Add a '}' at the end of the object", parser.previous().span);
    });
  }

  return new ObjectExpression(props, new Span(start, parser.previous().span.end));
}
