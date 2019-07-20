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

      identifier = parser.consume(LexicalToken.IDENTIFIER, 'decl.import.identifier_after_as');
    }
  } else {
    source = parser.consume(LexicalToken.STRING, 'decl.import.source_after_import');

    parser.eatWhitespace();
    parser.consume(LexicalToken.AS, 'decl.import.as_after_import');
    parser.eatWhitespace();

    identifier = parser.consume(LexicalToken.IDENTIFIER, 'decl.import.identifier_after_as');
  }

  parser.consume(LexicalToken.NEWLINE, 'decl.import.newline_after_import_decl');
  parser.syncIndentation();

  return new ImportDeclaration(source, identifier, {
    start,
    end: parser.previous().location.end,
  });
}
