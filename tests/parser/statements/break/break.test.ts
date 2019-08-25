import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../test-utils';

import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { BreakStatement } from '../../../../src/grammar/nodes/Statements';

describe('break', () => {
  it('parses correctly', () => {
    const program = parse('break');

    const stmt = program.body[0] as BreakStatement;
    expect(stmt.type).to.equal(SyntacticToken.BREAK_STMT);
    expect(stmt).to.be.an.instanceof(BreakStatement);
  });
});
