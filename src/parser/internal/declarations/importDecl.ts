import {
  Node, Token, LexicalToken, ImportDeclaration,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function importDecl(parser: Parser): Node {
  const importSpan = parser.previous().span;
  parser.eatWhitespace();

  let source: Token;
  let identifier: Token | null = null;

  if (parser.check(LexicalToken.IDENTIFIER)) {
    source = parser.advance();

    if (parser.peekIgnoreWhitespace().type === LexicalToken.AS) {
      parser.eatWhitespace();
      const asSpan = parser.advance().span;
      parser.eatWhitespace();

      identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'as'", (error) => {
        error.info('Add an identifier after this as', asSpan);
      });
    }
  } else {
    source = parser.consume(LexicalToken.STRING, "Expected an identifier or string after 'import'", (error) => {
      error.info('Add an identifier or string after this import', importSpan);
    });

    parser.eatWhitespace();
    const asSpan = parser.consume(LexicalToken.AS, "Importing a file must always be followed with 'as'", (error) => {
      error.info("Add 'as' after the source", source.span);
    }).span;
    parser.eatWhitespace();

    identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'as'", (error) => {
      error.info('Add an identifier after this as', asSpan);
    });
  }

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline after the import declaration');
  parser.syncIndentation();

  return new ImportDeclaration(
    source,
    identifier,
    new Span(importSpan.start, parser.previous().span.end),
  );
}
