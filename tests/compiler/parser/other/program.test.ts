import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../test-utils';

import { Program } from '../../../../src/grammar/nodes/Other';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';

describe('program', () => {
  it('works when empty', () => {
    const program = parse('');
    expect(program.type).to.equal(SyntacticToken.PROGRAM);
    expect(program).to.be.an.instanceof(Program);
    expect(program.body.length).to.equal(0);

    expect(program.span).to.deep.equal({
      start: [0, 0],
      end: [0, 0],
    });
  });

  it('works with code', () => {
    const program = parse('5');
    expect(program.type).to.equal(SyntacticToken.PROGRAM);
    expect(program).to.be.an.instanceof(Program);
    expect(program.body.length).to.equal(1);

    expect(program.span).to.deep.equal({
      start: [0, 0],
      end: [0, 2],
    });
  });
});
