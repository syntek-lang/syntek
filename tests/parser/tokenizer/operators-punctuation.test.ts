import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../src/parser/Tokenizer';

import { LexicalToken } from '../../../src/grammar/LexicalToken';

const map = {
  // Operators
  '+': LexicalToken.PLUS,
  '-': LexicalToken.MINUS,
  '*': LexicalToken.STAR,
  '/': LexicalToken.SLASH,
  '%': LexicalToken.PERCENT,
  '^': LexicalToken.CARET,

  '=': LexicalToken.EQUAL,
  '==': LexicalToken.EQUAL_EQUAL,

  '!': LexicalToken.BANG,
  '!=': LexicalToken.BANG_EQUAL,

  '<': LexicalToken.LT,
  '<=': LexicalToken.LT_EQUAL,

  '>': LexicalToken.GT,
  '>=': LexicalToken.GT_EQUAL,

  // Punctuation
  '.': LexicalToken.DOT,
  ',': LexicalToken.COMMA,
  '[': LexicalToken.L_SQB,
  ']': LexicalToken.R_SQB,
  '(': LexicalToken.L_PAR,
  ')': LexicalToken.R_PAR,
  '{': LexicalToken.L_BRACE,
  '}': LexicalToken.R_BRACE,
  ':': LexicalToken.COLON,
};

describe('operators and punctuation', () => {
  it('parses correctly', () => {
    Object.entries(map).forEach(([char, type]) => {
      const { tokens } = new Tokenizer(char).tokenize();

      expect(tokens[0].type).to.equal(type);
      expect(tokens[0].lexeme).to.equal(char);
      expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, char.length] });
    });
  });
});
