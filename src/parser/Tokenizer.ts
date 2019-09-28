import {
  Token, LexicalToken,
  WORD_TOKENS,
} from '../grammar';

import { Span } from '../position';
import { Diagnostic, Level } from '../diagnostic';

export class Tokenizer {
  /**
   * The code to tokenize
   */
  private readonly source: string;

  /**
   * The tokens collected during tokenizing the code
   */
  private readonly tokens: Token[] = [];

  /**
   * The comments in the code
   */
  private readonly comments: Token[] = [];

  /**
   * The diagnostics reported during tokenizing
   */
  private readonly diagnostics: Diagnostic[] = [];

  /**
   * The index of the current token being scanned
   */
  private index = 0;

  private line = 0;

  private column = 0;

  private onlyWhitespace = true;

  /**
   * Create a new tokenizer
   *
   * @param source - The code to tokenize
   */
  constructor(source: string) {
    this.source = source;
  }

  /**
   * Tokenize the code
   *
   * @returns The tokens and comments in the code, and zero or more diagnostics. If one
   * or more diagnostics are returned the code is invalid.
   */
  tokenize(): {
    tokens: Token[];
    comments: Token[];
    diagnostics: Diagnostic[];
  } {
    while (!this.isAtEnd()) {
      this.scanToken();
    }

    // EOF token
    this.tokens.push(new Token(LexicalToken.EOF, '', new Span(
      [this.line, this.column],
      [this.line, this.column + 1],
    )));

    return {
      tokens: this.tokens,
      comments: this.comments,
      diagnostics: this.diagnostics,
    };
  }

  private scanToken(): void {
    const c = this.advance();

    switch (c) {
      // Whitespace
      case '\n':
        // Ignore empty lines
        if (!this.onlyWhitespace) {
          this.add(LexicalToken.NEWLINE, c);
          this.nextLine();
        }
        break;

      case '#':
        this.comment(c);
        break;

      case ' ':
      case '\r':
      case '\t':
        // Ignore other whitespace
        this.column += 1;
        break;

      // Operators
      case '+':
        this.add(LexicalToken.PLUS, c);
        break;

      case '-':
        this.add(LexicalToken.MINUS, c);
        break;

      case '*':
        this.add(LexicalToken.STAR, c);
        break;

      case '/':
        this.add(LexicalToken.SLASH, c);
        break;

      case '%':
        this.add(LexicalToken.PERCENT, c);
        break;

      case '^':
        this.add(LexicalToken.CARET, c);
        break;

      case '=':
        if (this.match('=')) {
          this.add(LexicalToken.EQUAL_EQUAL, `${c}=`);
        } else {
          this.add(LexicalToken.EQUAL, c);
        }
        break;

      case '!':
        if (this.match('=')) {
          this.add(LexicalToken.BANG_EQUAL, `${c}=`);
        } else {
          this.add(LexicalToken.BANG, c);
        }
        break;

      case '<':
        if (this.match('=')) {
          this.add(LexicalToken.LT_EQUAL, `${c}=`);
        } else {
          this.add(LexicalToken.LT, c);
        }
        break;

      case '>':
        if (this.match('=')) {
          this.add(LexicalToken.GT_EQUAL, `${c}=`);
        } else {
          this.add(LexicalToken.GT, c);
        }
        break;

      // Punctuation
      case '.':
        this.add(LexicalToken.DOT, c);
        break;

      case ',':
        this.add(LexicalToken.COMMA, c);
        break;

      case '[':
        this.add(LexicalToken.L_SQB, c);
        break;

      case ']':
        this.add(LexicalToken.R_SQB, c);
        break;

      case '(':
        this.add(LexicalToken.L_PAR, c);
        break;

      case ')':
        this.add(LexicalToken.R_PAR, c);
        break;

      case '{':
        this.add(LexicalToken.L_BRACE, c);
        break;

      case '}':
        this.add(LexicalToken.R_BRACE, c);
        break;

      case ':':
        this.add(LexicalToken.COLON, c);
        break;

      // String
      case '\'':
      case '"':
        this.string(c);
        break;

      default:
        if (this.isDigit(c)) {
          this.number(c);
          break;
        } else if (this.isAlpha(c)) {
          this.word(c);
        } else {
          this.error(`Unexpected token "${c}"`, c.length);
        }
    }
  }

  private string(start: string): void {
    let content = start;

    while (this.peek() !== start) {
      if (this.peek() === '\n' || this.isAtEnd()) {
        this.error('Strings can not span multiple lines', content.length);
        return;
      }

      // The character is escaped, so consume the '\' as well
      if (this.peek() === '\\') {
        content += this.advance();
      }

      content += this.advance();
    }

    // Closing character
    content += this.advance();

    this.add(LexicalToken.STRING, content);
  }

  private number(start: string): void {
    let content = start;

    // Match the integer part
    while (this.isDigit(this.peek()) || this.peek() === '_') {
      content += this.advance();
    }

    // Match the fractional part
    if (this.peek() === '.' && this.isDigit(this.peek(1))) {
      content += this.advance();

      while (this.isDigit(this.peek()) || this.peek() === '_') {
        content += this.advance();
      }
    }

    this.add(LexicalToken.NUMBER, content);
  }

  private word(start: string): void {
    let content = start;

    while (this.isAlphaNumeric(this.peek())) {
      content += this.advance();
    }

    const type = Object.prototype.hasOwnProperty.call(WORD_TOKENS, content)
      ? WORD_TOKENS[content]
      : null;

    if (type) {
      this.add(type, content);
    } else {
      this.add(LexicalToken.IDENTIFIER, content);
    }
  }

  private comment(start: string): void {
    let content = start;

    while (this.peek() !== '\n' && !this.isAtEnd()) {
      content += this.advance();
    }

    this.comments.push(new Token(LexicalToken.COMMENT, content, new Span(
      [this.line, this.column],
      [this.line, this.column + content.length],
    )));

    this.nextLine();
  }

  private nextLine(): void {
    this.line += 1;
    this.column = 0;
    this.onlyWhitespace = true;
  }

  private add(type: LexicalToken, lexeme: string): void {
    this.tokens.push(new Token(type, lexeme, new Span(
      [this.line, this.column],
      [this.line, this.column + lexeme.length],
    )));

    this.column += lexeme.length;
    this.onlyWhitespace = false;
  }

  private isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  private isAlpha(char: string): boolean {
    return (char >= 'a' && char <= 'z')
      || (char >= 'A' && char <= 'Z')
      || char === '_';
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isDigit(char) || this.isAlpha(char);
  }

  private isAtEnd(): boolean {
    return this.index >= this.source.length;
  }

  private peek(offset = 0): string {
    return this.source[this.index + offset];
  }

  private match(char: string): boolean {
    if (this.peek() === char) {
      this.index += 1;
      return true;
    }

    return false;
  }

  private advance(): string {
    this.index += 1;
    return this.peek(-1);
  }

  /**
   * Report an error
   *
   * @param msg - The error message
   * @param length - The length of the invalid lexeme
   */
  private error(msg: string, length: number): void {
    const diagnostic = new Diagnostic(Level.ERROR, 'tokenizer', msg, new Span(
      [this.line, this.column],
      [this.line, this.column + length],
    ));

    this.diagnostics.push(diagnostic);
  }
}
