import {
  Node, Token, LexicalToken, Declarations,
} from '../../..';

import { Parser } from '../../Parser';

export function importDecl(this: Parser): Node {
  const start = this.previous().location.start;
  this.eatWhitespace();

  let source: Token;
  let identifier: Token | null = null;

  if (this.check(LexicalToken.IDENTIFIER)) {
    source = this.advance();

    if (this.peekIgnoreWhitespace().type === LexicalToken.AS) {
      this.eatWhitespace();
      this.advance();
      this.eatWhitespace();

      identifier = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier after as');
    }
  } else {
    source = this.consume(LexicalToken.STRING, 'Expected source after import');

    this.eatWhitespace();
    this.consume(LexicalToken.AS, 'Expected as after import');
    this.eatWhitespace();

    identifier = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier after as');
  }

  this.consume(LexicalToken.NEWLINE, 'Expected newline after import statement');
  this.syncIndentation();

  return new Declarations.ImportDeclaration(source, identifier, {
    start,
    end: this.previous().location.end,
  });
}
