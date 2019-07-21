import { LexicalToken } from '.';
import { Span } from '../position';

export class Token {
  readonly type: LexicalToken;

  readonly lexeme: string;

  readonly span: Span;

  constructor(type: LexicalToken, lexeme: string, span: Span) {
    this.type = type;
    this.lexeme = lexeme;
    this.span = span;
  }
}
