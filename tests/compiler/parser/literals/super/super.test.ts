import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../../test-utils';

import { Super } from '../../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';

describe('super', () => {
  it('parses correctly', () => {
    const program = parse('super');

    const stmt = program.body[0] as ExpressionStatement;
    expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
    expect(stmt).to.be.an.instanceof(ExpressionStatement);

    const expr = stmt.expression as Super;
    expect(expr.type).to.equal(SyntacticToken.SUPER);
    expect(expr).to.be.an.instanceof(Super);
  });
});
