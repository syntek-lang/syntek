import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../../test-utils';

import { Literal } from '../../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';

describe('null', () => {
  it('parses correctly', () => {
    const program = parse('null');

    const stmt = program.body[0] as ExpressionStatement;
    expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
    expect(stmt).to.be.an.instanceof(ExpressionStatement);

    const expr = stmt.expression as Literal;
    expect(expr.type).to.equal(SyntacticToken.LITERAL);
    expect(expr).to.be.an.instanceof(Literal);
    expect(expr.value.lexeme).to.equal('null');
  });
});
