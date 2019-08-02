import { LexicalToken } from '.';

// Tokens that consist of a single character
export const CHAR_TOKENS: { [key: string]: LexicalToken } = {
  // Whitespace
  '\t': LexicalToken.WHITESPACE,
  ' ': LexicalToken.WHITESPACE,

  // Operators
  '+': LexicalToken.PLUS,
  '-': LexicalToken.MINUS,
  '*': LexicalToken.STAR,
  '/': LexicalToken.SLASH,
  '%': LexicalToken.PERCENT,
  '^': LexicalToken.CARET,
  '=': LexicalToken.EQUAL,

  // Punctuation
  '.': LexicalToken.DOT,
  ',': LexicalToken.COMMA,
  '[': LexicalToken.LSQB,
  ']': LexicalToken.RSQB,
  '(': LexicalToken.LPAR,
  ')': LexicalToken.RPAR,
  '{': LexicalToken.LBRACE,
  '}': LexicalToken.RBRACE,
};

// Tokens that are a single word
export const WORD_TOKENS: { [key: string]: LexicalToken } = {
  // Boolean
  true: LexicalToken.BOOLEAN,
  false: LexicalToken.BOOLEAN,

  // Null
  null: LexicalToken.NULL,

  // Keywords
  class: LexicalToken.CLASS,
  new: LexicalToken.NEW,
  static: LexicalToken.STATIC,
  this: LexicalToken.THIS,
  super: LexicalToken.SUPER,
  extends: LexicalToken.EXTENDS,
  instanceof: LexicalToken.INSTANCEOF,

  if: LexicalToken.IF,
  else: LexicalToken.ELSE,

  switch: LexicalToken.SWITCH,
  case: LexicalToken.CASE,
  fallthrough: LexicalToken.FALLTHROUGH,

  function: LexicalToken.FUNCTION,
  return: LexicalToken.RETURN,
  returns: LexicalToken.RETURNS,

  async: LexicalToken.ASYNC,

  try: LexicalToken.TRY,
  catch: LexicalToken.CATCH,
  throw: LexicalToken.THROW,

  import: LexicalToken.IMPORT,
  as: LexicalToken.AS,

  for: LexicalToken.FOR,
  in: LexicalToken.IN,
  repeat: LexicalToken.REPEAT,
  times: LexicalToken.TIMES,
  while: LexicalToken.WHILE,
  continue: LexicalToken.CONTINUE,
  break: LexicalToken.BREAK,

  and: LexicalToken.AND,
  or: LexicalToken.OR,
  not: LexicalToken.NOT,

  is: LexicalToken.IS,

  any: LexicalToken.ANY,
};
