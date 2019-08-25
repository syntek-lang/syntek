import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../test-utils';

import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { FallthroughStatement } from '../../../../src/grammar/nodes/Statements';

describe('fallthrough', () => {
  it('parses correctly', () => {
    const program = parse('fallthrough');

    const stmt = program.body[0] as FallthroughStatement;
    expect(stmt.type).to.equal(SyntacticToken.FALLTHROUGH_STMT);
    expect(stmt).to.be.an.instanceof(FallthroughStatement);
  });
});
