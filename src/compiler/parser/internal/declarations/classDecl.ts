import {
  Node, Token, LexicalToken, ClassDeclaration, ClassProp,
} from '../../../../grammar';

import { Parser } from '../../..';

export function classDecl(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after "class"');

  const extend: Token[] = [];
  if (parser.peekIgnoreWhitespace().type === LexicalToken.EXTENDS) {
    parser.eatWhitespace();
    parser.advance();

    do {
      parser.eatWhitespace();
      extend.push(parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after extends'));

      if (parser.peekIgnoreWhitespace().type === LexicalToken.COMMA) {
        parser.eatWhitespace();
      }
    } while (parser.match(LexicalToken.COMMA));
  }

  parser.consume(LexicalToken.NEWLINE, 'Expected newline after class declaration');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after class declaration');

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
    {
      start,
      end: parser.previous().location.end,
    },
  );
}
