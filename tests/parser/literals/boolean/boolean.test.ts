import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../test-utils';

import { BooleanLiteral } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';

describe('boolean', () => {
  it('parses "true" correctly', () => {
    const program = parse('true');

    const stmt = program.body[0] as ExpressionStatement;
    expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
    expect(stmt).to.be.an.instanceof(ExpressionStatement);

    const expr = stmt.expression as BooleanLiteral;
    expect(expr.type).to.equal(SyntacticToken.BOOLEAN_LITERAL);
    expect(expr).to.be.an.instanceof(BooleanLiteral);
    expect(expr.value.lexeme).to.equal('true');
  });

  it('parses "false" correctly', () => {
    const program = parse('false');

    const stmt = program.body[0] as ExpressionStatement;
    expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
    expect(stmt).to.be.an.instanceof(ExpressionStatement);

    const expr = stmt.expression as BooleanLiteral;
    expect(expr.type).to.equal(SyntacticToken.BOOLEAN_LITERAL);
    expect(expr).to.be.an.instanceof(BooleanLiteral);
    expect(expr.value.lexeme).to.equal('false');
  });
});
