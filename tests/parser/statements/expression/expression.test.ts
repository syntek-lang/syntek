import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { NumberLiteral, Identifier } from '../../../../src/grammar/nodes/Expressions';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';

describe('expression', () => {
  it('parses identifier correctly', () => {
    const program = parse('x');

    function check(node: Node): void {
      const stmt = node as ExpressionStatement;
      expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(stmt).to.be.an.instanceof(ExpressionStatement);

      const expr = stmt.expression as Identifier;
      expect(expr.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(expr).to.be.an.instanceof(Identifier);
      expect(expr.lexeme).to.equal('x');
    }

    program.body.forEach(check);
  });

  it('parses literal correctly', () => {
    const program = parse('5');

    function check(node: Node): void {
      const stmt = node as ExpressionStatement;
      expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(stmt).to.be.an.instanceof(ExpressionStatement);

      const expr = stmt.expression as NumberLiteral;
      expect(expr.type).to.equal(SyntacticToken.NUMBER_LITERAL);
      expect(expr).to.be.an.instanceof(NumberLiteral);
      expect(expr.value.lexeme).to.equal('5');
    }

    program.body.forEach(check);
  });
});
