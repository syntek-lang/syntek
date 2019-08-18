import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../../src/compiler/parser/Tokenizer';

import { LexicalToken } from '../../../../src/grammar/LexicalToken';

const map = {
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
  void: LexicalToken.VOID,

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

  var: LexicalToken.VAR,
};

describe('keywords', () => {
  it('parses correctly', () => {
    Object.entries(map).forEach(([keyword, type]) => {
      const { tokens } = new Tokenizer(keyword).tokenize();

      expect(tokens[0].type).to.equal(type);
      expect(tokens[0].lexeme).to.equal(keyword);
      expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, keyword.length] });
    });
  });
});
