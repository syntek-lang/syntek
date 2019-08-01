import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../../src/compiler/parser/Tokenizer';

import { LexicalToken } from '../../../../src/grammar/LexicalToken';

const map = {
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

describe('operators and punctuation', () => {
  it('parses correctly', () => {
    Object.entries(map).forEach(([char, type]) => {
      const { tokens } = new Tokenizer(char).tokenize();

      expect(tokens[0].type).to.equal(type);
      expect(tokens[0].lexeme).to.equal(char);
      expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 1] });
    });
  });
});
