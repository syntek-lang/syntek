export enum LexicalToken {
  // Whitespace
  NEWLINE,
  INDENT,
  OUTDENT,
  COMMENT,
  WHITESPACE,

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

  // Punctuation
  DOT,
  COMMA,
  LSQB,
  RSQB,
  LPAR,
  RPAR,
  LT,
  GT,
  COLON,

  // Literals
  NUMBER,
  STRING,
  BOOLEAN,
  NULL,

  // Keywords
  CLASS,
  NEW,
  STATIC,
  THIS,
  SUPER,
  EXTENDS,
  INSTANCEOF,

  IF,
  THEN,
  ELSE,

  SWITCH,
  CASE,
  FALLTHROUGH,

  FUNCTION,
  RETURN,
  VOID,

  ASYNC,

  IMPORT,
  AS,

  FOR,
  IN,
  REPEAT,
  TIMES,
  WHILE,
  CONTINUE,
  BREAK,

  AND,
  OR,
  NOT,

  IS,
  IS_NOT,
  IS_LESS_THAN,
  IS_GREATER_THAN,

  VAR,

  // End of file
  EOF,
}
