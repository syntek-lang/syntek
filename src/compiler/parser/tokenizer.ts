import {
  Token, LexicalToken, TokenLocation,
  CHAR_TOKENS, WORD_TOKENS,
} from '..';

type UnexpectedTokens = { char: string; loc: TokenLocation }[];

function getIndent(line: string): number {
  const match = line.match(/^\t+/);
  return match ? match[0].length : 0;
}

export function tokenize(input: string): { tokens: Token[]; errors: UnexpectedTokens } {
  const tokens: Token[] = [];
  const errors: UnexpectedTokens = [];
  const lines = input.split(/\r?\n/g);

  let prevIndent = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];

    // Check if the line is considered empty
    const emptyLineMatch = line.match(/^\s*(#.*)?$/);

    if (emptyLineMatch) {
      // Add a comment if there is one
      if (emptyLineMatch[1]) {
        tokens.push(new Token(LexicalToken.COMMENT, emptyLineMatch[1], {
          start: [lineIndex, 0],
          end: [lineIndex, emptyLineMatch[0].indexOf('#')],
        }));
      }
    } else {
      // Get the indentation of this line
      const indent = getIndent(line);

      // Add indent and outdent tokens
      if (indent > prevIndent) {
        const diff = indent - prevIndent;

        tokens.push(...new Array(diff).fill(null).map(() => new Token(LexicalToken.INDENT, '\t', {
          start: [lineIndex, 0],
          end: [lineIndex, diff],
        })));
      } else if (indent < prevIndent) {
        tokens.push(...new Array(prevIndent - indent).fill(null).map(() => new Token(LexicalToken.OUTDENT, '', {
          start: [lineIndex, 0],
          end: [lineIndex, indent],
        })));
      }
      // Set the previous indent for the next iteration
      prevIndent = indent;

      let colIndex = indent;
      while (colIndex < line.length) {
        // The current character
        const char = line[colIndex];

        // Get the single char type, if any
        const singleCharType = CHAR_TOKENS[char];

        // If it is a single char type add it to the tokens
        if (singleCharType) {
          tokens.push(new Token(singleCharType, char, {
            start: [lineIndex, colIndex],
            end: [lineIndex, colIndex + 1],
          }));

          colIndex += 1;
        } else {
          // Get the remaining characters on this line
          const remainingChars = line.slice(colIndex);

          if (char >= '0' && char <= '9') {
            // Current character is start of number
            const numberMatch = remainingChars.match(/^\d+(?:\.\d+)?/);

            if (numberMatch) {
              tokens.push(new Token(LexicalToken.NUMBER, numberMatch[0], {
                start: [lineIndex, colIndex],
                end: [lineIndex, colIndex + numberMatch[0].length],
              }));

              colIndex += numberMatch[0].length;
            }
          } else if (char === '\'') {
            // Current character is start of string
            const stringMatch = remainingChars.match(/^'(?:[^'\\]|\\.)*'/);

            if (stringMatch) {
              tokens.push(new Token(LexicalToken.STRING, stringMatch[0], {
                start: [lineIndex, colIndex],
                end: [lineIndex, colIndex + stringMatch[0].length],
              }));

              colIndex += stringMatch[0].length;
            }
          } else {
            // Remaining characters should be a word
            const wordMatch = remainingChars.match(/^[a-z_]\w*/i);

            if (wordMatch) {
              const type = WORD_TOKENS[wordMatch[0]] || LexicalToken.IDENTIFIER;

              tokens.push(new Token(type, wordMatch[0], {
                start: [lineIndex, colIndex],
                end: [lineIndex, colIndex + wordMatch[0].length],
              }));

              colIndex += wordMatch[0].length;
            } else {
              // Unexpected character
              errors.push({
                char,
                loc: {
                  start: [lineIndex, colIndex],
                  end: [lineIndex, colIndex + 1],
                },
              });

              colIndex += 1;
            }
          }
        }
      }
    }

    // Every line has a newline token
    tokens.push(new Token(LexicalToken.NEWLINE, '\n', {
      start: [lineIndex, line.length],
      end: [lineIndex, line.length + 1],
    }));
  }

  return { tokens, errors };
}
