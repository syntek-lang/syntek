import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../../test-utils';

import { This } from '../../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';

describe('this', () => {
  it('parses correctly', () => {
    const program = parse('this');

    const stmt = program.body[0] as ExpressionStatement;
    expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
    expect(stmt).to.be.an.instanceof(ExpressionStatement);

    const expr = stmt.expression as This;
    expect(expr.type).to.equal(SyntacticToken.THIS);
    expect(expr).to.be.an.instanceof(This);
  });
});
