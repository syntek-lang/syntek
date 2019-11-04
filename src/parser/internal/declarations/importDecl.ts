import {
  Node, Token, LexicalToken,
  FullImportDeclaration, PartialImportDeclaration, ImportExpose,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function importDecl(parser: Parser): Node {
  const importSpan = parser.previous().span;
  const path: Token[] = [];

  do {
    parser.ignoreNewline();

    path.push(parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'import'"));
  } while (
    // import std.math.{
    //                ^^
    parser.matchIgnoreNewline(LexicalToken.DOT) && !parser.checkIgnoreNewline(LexicalToken.L_BRACE)
  );

  // Expose
  if (parser.matchIgnoreNewline(LexicalToken.L_BRACE)) {
    const expose: ImportExpose[] = [];

    do {
      parser.ignoreNewline();

      const value = parser.consume(LexicalToken.IDENTIFIER, 'Expected an identifier');
      let rename: Token | undefined;

      if (parser.matchIgnoreNewline(LexicalToken.AS)) {
        parser.ignoreNewline();

        rename = parser.consume(LexicalToken.IDENTIFIER, "Expected identifier after 'as'");
      }

      expose.push(new ImportExpose(
        value,
        rename,
        new Span(
          value.span.start,
          rename ? rename.span.end : value.span.end,
        ),
      ));
    } while (parser.matchIgnoreNewline(LexicalToken.COMMA));

    parser.ignoreNewline();
    parser.consume(LexicalToken.R_BRACE, "Expected '}'");

    return new PartialImportDeclaration(
      path,
      expose,
      new Span(importSpan.start, parser.previous().span.end),
    );
  }

  let rename: Token | undefined;
  if (parser.matchIgnoreNewline(LexicalToken.AS)) {
    parser.ignoreNewline();

    rename = parser.consume(LexicalToken.IDENTIFIER, "Expected identifier after 'as'");
  }

  return new FullImportDeclaration(
    path,
    rename,
    new Span(importSpan.start, parser.previous().span.end),
  );
}
