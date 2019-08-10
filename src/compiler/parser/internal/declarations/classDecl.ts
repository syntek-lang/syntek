import {
  Node, Identifier, LexicalToken, ClassDeclaration,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function classDecl(parser: Parser): Node {
  const classSpan = parser.previous().span;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'class'", (error) => {
    error.info('Add an identifier after this class', classSpan);
  });

  const extend: Identifier[] = [];
  if (parser.peekIgnoreWhitespace().type === LexicalToken.EXTENDS) {
    parser.eatWhitespace();
    const extendSpan = parser.advance().span;

    do {
      parser.eatWhitespace();

      const extendToken = parser.consume(LexicalToken.IDENTIFIER, "Expected a list of identifiers after 'extends'", (error) => {
        error.info('Add one or more identifiers after this extends', extendSpan);
      });
      extend.push(new Identifier(extendToken, extendToken.span));

      if (parser.peekIgnoreWhitespace().type === LexicalToken.COMMA) {
        parser.eatWhitespace();
      }
    } while (parser.match(LexicalToken.COMMA));
  }

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline and indent after the class signature');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected a newline and indent after the class signature');

  const staticBody: Node[] = [];
  const instanceBody: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    const isStatic = parser.match(LexicalToken.STATIC);

    if (isStatic) {
      parser.eatWhitespace();
      staticBody.push(parser.declaration());
    } else {
      instanceBody.push(parser.declaration());
    }
  }

  return new ClassDeclaration(
    new Identifier(identifier),
    extend,
    staticBody,
    instanceBody,
    new Span(classSpan.start, parser.previous().span.end),
  );
}
