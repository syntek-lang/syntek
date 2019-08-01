import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../../src/compiler/parser/Tokenizer';

import { LexicalToken } from '../../../../src/grammar/LexicalToken';

describe('string', () => {
  it('parses an empty string correctly', () => {
    const { tokens } = new Tokenizer("''").tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.STRING);
    expect(tokens[0].lexeme).to.equal("''");
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 2] });
  });

  it('parses a string with chars correctly', () => {
    const { tokens } = new Tokenizer("'abc'").tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.STRING);
    expect(tokens[0].lexeme).to.equal("'abc'");
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 5] });
  });

  it('parses a string with newline correctly', () => {
    const { tokens } = new Tokenizer("'\\n'").tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.STRING);
    expect(tokens[0].lexeme).to.equal("'\\n'");
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 4] });
  });

  it('parses a string with escaped quote correctly', () => {
    const { tokens } = new Tokenizer("'\\''").tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.STRING);
    expect(tokens[0].lexeme).to.equal("'\\''");
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 4] });
  });

  it('does not see an escaped quote as the end of a string', () => {
    const { diagnostics, tokens } = new Tokenizer("'\\'").tokenize();

    expect(diagnostics.length).to.be.greaterThan(0);
    expect(tokens[0].type).to.not.equal(LexicalToken.STRING);
  });
});
