import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../../src/compiler/parser/Tokenizer';

import { LexicalToken } from '../../../../src/grammar/LexicalToken';

describe('boolean', () => {
  it('parses "true" correctly', () => {
    const { tokens } = new Tokenizer('true').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.BOOLEAN);
    expect(tokens[0].lexeme).to.equal('true');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 4] });
  });

  it('parses "false" correctly', () => {
    const { tokens } = new Tokenizer('false').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.BOOLEAN);
    expect(tokens[0].lexeme).to.equal('false');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 5] });
  });
});
