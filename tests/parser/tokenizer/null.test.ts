import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../src/parser/Tokenizer';

import { LexicalToken } from '../../../src/grammar/LexicalToken';

describe('null', () => {
  it('parses correctly', () => {
    const { tokens } = new Tokenizer('null').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NULL);
    expect(tokens[0].lexeme).to.equal('null');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 4] });
  });
});
