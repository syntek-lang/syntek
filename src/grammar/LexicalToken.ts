export enum LexicalToken {
  // Whitespace
  NEWLINE,
  COMMENT,

  // Identifier
  IDENTIFIER,

  // Operators
  PLUS,
  MINUS,
  STAR,
  SLASH,
  PERCENT,
  CARET,

  EQUAL,
  EQUAL_EQUAL,

  BANG,
  BANG_EQUAL,

  LT,
  LT_EQUAL,

  GT,
  GT_EQUAL,

  // Punctuation
  DOT,
  COMMA,
  L_SQB,
  R_SQB,
  L_PAR,
  R_PAR,
  L_BRACE,
  R_BRACE,
  COLON,

  // Literals
  NUMBER,
  STRING,
  BOOLEAN,

  // Keywords
  CLASS,
  EXTENDS,
  NEW,

  ABSTRACT,
  STATIC,

  THIS,
  SUPER,
  INSTANCEOF,

  IF,
  ELSE,

  FUNCTION,
  RETURN,
  VOID,

  ASYNC,

  IMPORT,
  AS,

  FOR,
  IN,
  WHILE,

  CONTINUE,
  BREAK,
  YIELD,

  AND,
  OR,

  VAR,

  // End of file
  EOF,
}
