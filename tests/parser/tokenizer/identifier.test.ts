import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../src/parser/Tokenizer';

import { LexicalToken } from '../../../src/grammar/LexicalToken';

const valid = [
  'a',
  '_',
  '_0',
  '_a',
  'abc',
  'ABC',
  '___',
  'any',
  '_05ab',
  'test',
  'HelloWorld',
];

const invalid = [
  '0_',
  'function',
  'var',
  'for',
  'class',
  'static',
  'true',
  '0',
];

describe('identifier', () => {
  it('parses valid identifiers correctly', () => {
    valid.forEach((identifier) => {
      const { tokens } = new Tokenizer(identifier).tokenize();

      expect(tokens[0].type).to.equal(LexicalToken.IDENTIFIER);
      expect(tokens[0].lexeme).to.equal(identifier);
      expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, identifier.length] });
    });
  });

  it('does not see invalid identifiers as identifiers', () => {
    invalid.forEach((string) => {
      const { tokens } = new Tokenizer(string).tokenize();
      expect(tokens[0].type).to.not.equal(LexicalToken.IDENTIFIER);
    });
  });
});
