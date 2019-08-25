import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../src/parser/Tokenizer';

import { LexicalToken } from '../../../src/grammar/LexicalToken';

describe('number', () => {
  it('parses zero correctly', () => {
    const { tokens } = new Tokenizer('0').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('0');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 1] });
  });

  it('parses multiple zeros correctly', () => {
    const { tokens } = new Tokenizer('0000').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('0000');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 4] });
  });

  it('parses number correctly', () => {
    const { tokens } = new Tokenizer('5').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('5');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 1] });
  });

  it('parses number prefixed with zeros correctly', () => {
    const { tokens } = new Tokenizer('007').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('007');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 3] });
  });

  it('parses decimal correctly correctly', () => {
    const { tokens } = new Tokenizer('0.9').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('0.9');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 3] });
  });

  it('parses number with underscores correctly', () => {
    const { tokens } = new Tokenizer('0__0').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('0__0');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 4] });
  });

  it('parses decimal with underscores correctly', () => {
    const { tokens } = new Tokenizer('0__0.5__5').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('0__0.5__5');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 9] });
  });

  it('sees a number with trailing underscores as a number', () => {
    const { tokens } = new Tokenizer('6_').tokenize();

    expect(tokens[0].type).to.equal(LexicalToken.NUMBER);
    expect(tokens[0].lexeme).to.equal('6_');
    expect(tokens[0].span).to.deep.equal({ start: [0, 0], end: [0, 2] });
  });

  it('does not see number prefixed with underscores as a number', () => {
    const { tokens } = new Tokenizer('_6').tokenize();
    expect(tokens[0].type).to.not.equal(LexicalToken.NUMBER);
  });
});
