import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { LexicalToken } from '../../../../../src/grammar/LexicalToken';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { UnaryExpression, Literal } from '../../../../../src/grammar/nodes/Expressions';

describe('unary', () => {
  it('parses "negation" correctly', () => {
    const program = parse(loadRaw(__dirname, './negation.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as UnaryExpression;

      expect(expr.type).to.equal(SyntacticToken.UNARY_EXPR);
      expect(expr).to.be.an.instanceof(UnaryExpression);

      const right = expr.right as Literal;
      expect(right.type).to.equal(SyntacticToken.LITERAL);
      expect(right).to.be.an.instanceof(Literal);

      expect(expr.operator.type).to.equal(LexicalToken.MINUS);
      expect(right.value.lexeme).to.equal('15');
    }

    program.body.forEach(check);
  });

  it('parses "not" correctly', () => {
    const program = parse(loadRaw(__dirname, './not.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as UnaryExpression;

      expect(expr.type).to.equal(SyntacticToken.UNARY_EXPR);
      expect(expr).to.be.an.instanceof(UnaryExpression);

      const right = expr.right as Literal;
      expect(right.type).to.equal(SyntacticToken.LITERAL);
      expect(right).to.be.an.instanceof(Literal);

      expect(expr.operator.type).to.equal(LexicalToken.NOT);
      expect(right.value.lexeme).to.equal('true');
    }

    program.body.forEach(check);
  });
});
