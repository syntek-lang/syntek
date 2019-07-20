import 'mocha';
import { expect } from 'chai';

import { Tokenizer } from '../../../../src/compiler/parser/Tokenizer';

import { LexicalToken } from '../../../../src/grammar/LexicalToken';

describe('comments', () => {
  it('returns 0 comments when program is empty', () => {
    const { comments } = new Tokenizer('').tokenize();
    expect(comments.length).to.equal(0);
  });

  it('parses single comment correctly', () => {
    const { comments } = new Tokenizer('# this is a comment').tokenize();
    expect(comments.length).to.equal(1);

    expect(comments[0].lexeme).to.equal('# this is a comment');
    expect(comments[0].type).to.equal(LexicalToken.COMMENT);
    expect(comments[0].location).to.deep.equal({
      start: [0, 0],
      end: [0, 19],
    });
  });

  it('parses multiple comments correctly', () => {
    const { comments } = new Tokenizer('# this is a comment\n\n#this is another comment').tokenize();
    expect(comments.length).to.equal(2);

    expect(comments[0].lexeme).to.equal('# this is a comment');
    expect(comments[0].type).to.equal(LexicalToken.COMMENT);
    expect(comments[0].location).to.deep.equal({
      start: [0, 0],
      end: [0, 19],
    });

    expect(comments[1].lexeme).to.equal('#this is another comment');
    expect(comments[1].type).to.equal(LexicalToken.COMMENT);
    expect(comments[1].location).to.deep.equal({
      start: [2, 0],
      end: [2, 24],
    });
  });

  it('parses comment on filled line correctly', () => {
    const { comments } = new Tokenizer('while true # loop forever').tokenize();
    expect(comments.length).to.equal(1);

    expect(comments[0].lexeme).to.equal('# loop forever');
    expect(comments[0].type).to.equal(LexicalToken.COMMENT);
    expect(comments[0].location).to.deep.equal({
      start: [0, 11],
      end: [0, 25],
    });
  });
});
