import {
  Node, Token, LexicalToken, ImportDeclaration,
} from '../../../../grammar';

import { Parser } from '../../..';

export function importDecl(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  let source: Token;
  let identifier: Token | null = null;

  if (parser.check(LexicalToken.IDENTIFIER)) {
    source = parser.advance();

    if (parser.peekIgnoreWhitespace().type === LexicalToken.AS) {
      parser.eatWhitespace();
      parser.advance();
      parser.eatWhitespace();

      identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after as');
    }
  } else {
    source = parser.consume(LexicalToken.STRING, 'Expected source after import');

    parser.eatWhitespace();
    parser.consume(LexicalToken.AS, 'Expected as after import');
    parser.eatWhitespace();

    identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after as');
  }

  parser.consume(LexicalToken.NEWLINE, 'Expected newline after import statement');
  parser.syncIndentation();

  return new ImportDeclaration(source, identifier, {
    start,
    end: parser.previous().location.end,
  });
}
