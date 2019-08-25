import {
  Token, LexicalToken,
  CHAR_TOKENS, WORD_TOKENS,
} from '../grammar';

import { Span } from '../position';
import { Diagnostic, Level } from '../diagnostic';

export class Tokenizer {
  private readonly lines: string[];

  private readonly tokens: Token[] = [];

  private readonly comments: Token[] = [];

  private readonly diagnostics: Diagnostic[] = [];

  private indent = 0;

  constructor(source: string) {
    this.lines = source.split(/\r?\n/);
  }

  tokenize(): {
    tokens: Token[];
    comments: Token[];
    diagnostics: Diagnostic[];
  } {
    for (let i = 0; i < this.lines.length; i += 1) {
      this.scanLine(i);
    }

    // Add outdent tokens
    this.tokens.push(...new Array(this.indent).fill(null).map(() => new Token(LexicalToken.OUTDENT, '', new Span(
      [this.lines.length - 1, 0],
      [this.lines.length - 1, this.indent],
    ))));

    // Add EOF token after all tokens are scanned
    this.tokens.push(new Token(LexicalToken.EOF, '', new Span(
      [this.lines.length - 1, this.lines[this.lines.length - 1].length],
      [this.lines.length - 1, this.lines[this.lines.length - 1].length + 1],
    )));

    return {
      tokens: this.tokens,
      comments: this.comments,
      diagnostics: this.diagnostics,
    };
  }

  private getIndent(line: string): number {
    const match = line.match(/^\t+/);
    return match ? match[0].length : 0;
  }

  private scanLine(lineIndex: number): void {
    const line = this.lines[lineIndex];

    const trimmed = line.trimLeft();
    if (trimmed.length === 0) {
      // Return if the line is considered empty
      return;
    }

    // Add a comment if there is one
    if (trimmed.charAt(0) === '#') {
      this.comments.push(new Token(LexicalToken.COMMENT, trimmed, new Span(
        [lineIndex, line.length - trimmed.length],
        [lineIndex, line.length],
      )));

      // Comments last till the end of the line
      return;
    }

    // Get the indentation of this line
    const indent = this.getIndent(line);

    // Add indent and outdent tokens
    this.addIndentTokens(lineIndex, indent);

    // Set the previous indent for the next iteration
    this.indent = indent;

    let colIndex = indent;
    while (colIndex < line.length) {
      // The current character
      const char = line[colIndex];

      // Get the single char type, if any
      const singleCharType: LexicalToken | null = Object.prototype.hasOwnProperty.call(
        CHAR_TOKENS,
        char,
      )
        ? CHAR_TOKENS[char]
        : null;

      // If it is a single char type add it to the tokens
      if (singleCharType) {
        this.tokens.push(new Token(singleCharType, char, new Span(
          [lineIndex, colIndex],
          [lineIndex, colIndex + 1],
        )));

        colIndex += 1;
      } else {
        // Get the remaining characters on this line
        const remainingChars = line.slice(colIndex);
        let toAdd = 0;

        if (char >= '0' && char <= '9') {
          // Current character is start of number
          toAdd += this.matchNumber(remainingChars, lineIndex, colIndex);
        } else if (char === '\'') {
          // Current character is start of string
          toAdd += this.matchString(remainingChars, lineIndex, colIndex);
        } else if (char === '#') {
          // Current character is the start of a comment
          toAdd += this.matchComment(remainingChars, lineIndex, colIndex);
        } else {
          // Remaining characters should be a word
          const wordMatch = remainingChars.match(/^[a-z_]\w*/i);

          if (wordMatch) {
            toAdd += this.matchWord(wordMatch, remainingChars, lineIndex, colIndex);
          }
        }

        if (toAdd > 0) {
          colIndex += toAdd;
        } else {
          // Unexpected token
          colIndex += this.error(`Unexpected token '${char}'`, char, lineIndex, colIndex);
        }
      }
    }

    // Every line ends with a newline
    this.tokens.push(new Token(LexicalToken.NEWLINE, '\n', new Span(
      [lineIndex, line.length],
      [lineIndex, line.length + 1],
    )));
  }

  private addIndentTokens(lineIndex: number, indent: number): void {
    if (indent > this.indent) {
      const diff = indent - this.indent;

      this.tokens.push(...new Array(diff).fill(null).map(() => new Token(LexicalToken.INDENT, '\t', new Span(
        [lineIndex, 0],
        [lineIndex, diff],
      ))));
    } else if (indent < this.indent) {
      this.tokens.push(...new Array(this.indent - indent).fill(null).map(() => new Token(LexicalToken.OUTDENT, '', new Span(
        [lineIndex, 0],
        [lineIndex, indent],
      ))));
    }
  }

  private matchNumber(chars: string, lineIndex: number, colIndex: number): number {
    const numberMatch = chars.match(/^\d(?:\d|_)*(?:\.\d(?:\d|_)*)?/);

    if (numberMatch) {
      this.tokens.push(new Token(LexicalToken.NUMBER, numberMatch[0], new Span(
        [lineIndex, colIndex],
        [lineIndex, colIndex + numberMatch[0].length],
      )));

      return numberMatch[0].length;
    }

    return 0;
  }

  private matchString(chars: string, lineIndex: number, colIndex: number): number {
    const stringMatch = chars.match(/^'(?:[^'\\]|\\.)*'/);

    if (stringMatch) {
      this.tokens.push(new Token(LexicalToken.STRING, stringMatch[0], new Span(
        [lineIndex, colIndex],
        [lineIndex, colIndex + stringMatch[0].length],
      )));

      return stringMatch[0].length;
    }

    return 0;
  }

  private matchComment(chars: string, lineIndex: number, colIndex: number): number {
    // Comments last until the end of the current line
    this.comments.push(new Token(LexicalToken.COMMENT, chars, new Span(
      [lineIndex, colIndex],
      [lineIndex, colIndex + chars.length],
    )));

    return chars.length;
  }

  private matchWord(
    wordMatch: RegExpMatchArray,
    chars: string,
    lineIndex: number,
    colIndex: number,
  ): number {
    let lexeme = wordMatch[0];
    let type = LexicalToken.IDENTIFIER;

    // Check if the lexeme is a word token
    if (Object.prototype.hasOwnProperty.call(WORD_TOKENS, lexeme)) {
      type = WORD_TOKENS[lexeme];
    }

    // If 'less', 'greater', or 'than' is matched as a lexeme the line
    // did not include 'is' and is therefore incorrect
    if (lexeme === 'less' || lexeme === 'greater' || lexeme === 'than') {
      return this.error(
        lexeme === 'than'
          ? "'than' must come after 'is less' or 'is greater'. Make sure it's on the same line"
          : `'${lexeme}' must come after 'is'. Make sure it's on the same line`,
        lexeme,
        lineIndex,
        colIndex,
      );
    }

    if (wordMatch[0] === 'is') {
      // This regex matches 'is not', 'is less than', and 'is greater than'
      // It is used to group the 2-3 words into a single token
      // 'is' does not match
      const comparisonOperatorMatch = chars.match(/^is\s+(not|(?:(less|greater)\s+than))/);

      if (comparisonOperatorMatch) {
        lexeme = comparisonOperatorMatch[0];

        // 'less' and 'greater' are the 3rd element, 'not' is the 2nd element
        const operator = comparisonOperatorMatch[2] || comparisonOperatorMatch[1];
        switch (operator) {
          case 'not': type = LexicalToken.IS_NOT; break;
          case 'less': type = LexicalToken.IS_LESS_THAN; break;
          case 'greater': type = LexicalToken.IS_GREATER_THAN; break;
          default: break;
        }
      }
    }

    this.tokens.push(new Token(type, lexeme, new Span(
      [lineIndex, colIndex],
      [lineIndex, colIndex + lexeme.length],
    )));

    return lexeme.length;
  }

  private error(msg: string, lexeme: string, lineIndex: number, colIndex: number): number {
    this.diagnostics.push(new Diagnostic(Level.ERROR, msg, new Span(
      [lineIndex, colIndex],
      [lineIndex, colIndex + lexeme.length],
    )));

    return lexeme.length;
  }
}
