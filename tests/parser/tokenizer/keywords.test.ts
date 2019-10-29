import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../src/parser/Tokenizer';

import { LexicalToken } from '../../../src/grammar/LexicalToken';

const map = {
  // Boolean
  true: LexicalToken.BOOLEAN,
  false: LexicalToken.BOOLEAN,

  // Keywords
  class: LexicalToken.CLASS,
  new: LexicalToken.NEW,
  static: LexicalToken.STATIC,
  extends: LexicalToken.EXTENDS,

  this: LexicalToken.THIS,
  super: LexicalToken.SUPER,
  instanceof: LexicalToken.INSTANCEOF,

  if: LexicalToken.IF,
  else: LexicalToken.ELSE,

  function: LexicalToken.FUNCTION,
  return: LexicalToken.RETURN,
  void: LexicalToken.VOID,

  async: LexicalToken.ASYNC,

  import: LexicalToken.IMPORT,
  as: LexicalToken.AS,

  for: LexicalToken.FOR,
  in: LexicalToken.IN,
  while: LexicalToken.WHILE,

  continue: LexicalToken.CONTINUE,
  break: LexicalToken.BREAK,
  yield: LexicalToken.YIELD,

  and: LexicalToken.AND,
  or: LexicalToken.OR,

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
