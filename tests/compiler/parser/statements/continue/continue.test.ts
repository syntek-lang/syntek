import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../../test-utils';

import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ContinueStatement } from '../../../../../src/grammar/nodes/Statements';

describe('continue', () => {
  it('parses correctly', () => {
    const program = parse('continue');

    const stmt = program.body[0] as ContinueStatement;
    expect(stmt.type).to.equal(SyntacticToken.CONTINUE_STMT);
    expect(stmt).to.be.an.instanceof(ContinueStatement);
  });
});
