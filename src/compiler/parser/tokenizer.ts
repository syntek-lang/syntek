import {
  Token, LexicalToken, TokenLocation,
  CHAR_TOKENS, WORD_TOKENS,
} from '../../grammar';

type UnexpectedTokens = { string: string; loc: TokenLocation }[];

function getIndent(line: string): number {
  const match = line.match(/^\t+/);
  return match ? match[0].length : 0;
}

export function tokenize(input: string): {
  tokens: Token[];
  errors: UnexpectedTokens;
  comments: Token[];
} {
  const tokens: Token[] = [];
  const errors: UnexpectedTokens = [];
  const comments: Token[] = [];

  const lines = input.split(/\r?\n/g);
  let prevIndent = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];

    // Check if the line is considered empty
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.charAt(0) === '#') {
      // Add a comment if there is one
      if (trimmed.charAt(0) === '#') {
        comments.push(new Token(LexicalToken.COMMENT, trimmed, {
          start: [lineIndex, line.length - trimmed.length],
          end: [lineIndex, line.length],
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
          } else if (char === '#') {
            // Current character is the start of a comment
            // Comments last until the end of the current line
            comments.push(new Token(LexicalToken.COMMENT, remainingChars, {
              start: [lineIndex, colIndex],
              end: [lineIndex, colIndex + remainingChars.length],
            }));

            colIndex += remainingChars.length;
          } else {
            // Remaining characters should be a word
            const wordMatch = remainingChars.match(/^[a-z_]\w*/i);

            if (wordMatch) {
              let lexeme = wordMatch[0];
              let type = WORD_TOKENS[lexeme] || LexicalToken.IDENTIFIER;

              // If 'less', 'greater', or 'than' is matched as a lexeme the line
              // did not include 'is' and is therefore incorrect
              if (lexeme === 'less' || lexeme === 'greater' || lexeme === 'than') {
                errors.push({
                  string: lexeme, // TODO: Improve error message
                  loc: {
                    start: [lineIndex, colIndex],
                    end: [lineIndex, colIndex + lexeme.length],
                  },
                });

                colIndex += lexeme.length;
              }

              if (wordMatch[0] === 'is') {
                // This regex matches 'is not', 'is less than', and 'is greater than'
                // It is used to group the 2-3 words into a single token
                // 'is' does not match
                const comparisonOperatorMatch = remainingChars.match(/^is\s+(not|(?:(less|greater)\s+than))/);

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

              tokens.push(new Token(type, lexeme, {
                start: [lineIndex, colIndex],
                end: [lineIndex, colIndex + lexeme.length],
              }));

              colIndex += lexeme.length;
            } else {
              // Unexpected character
              errors.push({
                string: char,
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

      // Every line ends with a newline
      tokens.push(new Token(LexicalToken.NEWLINE, '\n', {
        start: [lineIndex, line.length],
        end: [lineIndex, line.length + 1],
      }));
    }
  }

  // Add outdent tokens
  tokens.push(...new Array(prevIndent).fill(null).map(() => new Token(LexicalToken.OUTDENT, '', {
    start: [lines.length - 1, 0],
    end: [lines.length - 1, prevIndent],
  })));

  // Add EOF token after all tokens are scanned
  tokens.push(new Token(LexicalToken.EOF, '', {
    start: [lines.length - 1, lines[lines.length - 1].length],
    end: [lines.length - 1, lines[lines.length - 1].length + 1],
  }));

  return { tokens, errors, comments };
}
