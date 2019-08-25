import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../test-utils';

import { Literal } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ReturnStatement } from '../../../../src/grammar/nodes/Statements';

describe('return', () => {
  it('parses correctly without value', () => {
    const program = parse('return');

    const stmt = program.body[0] as ReturnStatement;
    expect(stmt.type).to.equal(SyntacticToken.RETURN_STMT);
    expect(stmt).to.be.an.instanceof(ReturnStatement);
  });

  it('parses correctly with value', () => {
    const program = parse('return 5');

    const stmt = program.body[0] as ReturnStatement;
    expect(stmt.type).to.equal(SyntacticToken.RETURN_STMT);
    expect(stmt).to.be.an.instanceof(ReturnStatement);

    const expr = stmt.expression as Literal;
    expect(expr.type).to.equal(SyntacticToken.LITERAL);
    expect(expr).to.be.an.instanceof(Literal);
    expect(expr.value.lexeme).to.equal('5');
  });
});
