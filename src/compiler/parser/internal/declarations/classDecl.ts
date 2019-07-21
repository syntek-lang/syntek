import {
  Node, Token, LexicalToken, ClassDeclaration, ClassProp,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function classDecl(parser: Parser): Node {
  const start = parser.previous().span.start;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'decl.class.identifier_after_class');

  const extend: Token[] = [];
  if (parser.peekIgnoreWhitespace().type === LexicalToken.EXTENDS) {
    parser.eatWhitespace();
    parser.advance();

    do {
      parser.eatWhitespace();
      extend.push(parser.consume(LexicalToken.IDENTIFIER, 'decl.class.identifier_after_extends'));

      if (parser.peekIgnoreWhitespace().type === LexicalToken.COMMA) {
        parser.eatWhitespace();
      }
    } while (parser.match(LexicalToken.COMMA));
  }

  parser.consume(LexicalToken.NEWLINE, 'decl.class.newline_indent_after_class_signature');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'decl.class.newline_indent_after_class_signature');

  const body: ClassProp[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    const isStatic = parser.match(LexicalToken.STATIC);

    if (isStatic) {
      parser.eatWhitespace();
    }

    body.push({
      static: isStatic,
      value: parser.declaration(),
    });
  }

  return new ClassDeclaration(
    identifier,
    extend,
    body,
    new Span(start, parser.previous().span.end),
  );
}
