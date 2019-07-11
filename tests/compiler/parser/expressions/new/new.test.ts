import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { Literal, NewExpression, MemberExpression } from '../../../../../src/grammar/nodes/Expressions';

describe('new', () => {
  it('parses no params correctly', () => {
    const program = parse(loadRaw(__dirname, './no-params.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as NewExpression;

      expect(expr.type).to.equal(SyntacticToken.NEW_EXPR);
      expect(expr).to.be.an.instanceof(NewExpression);

      expect(expr.params.length).to.equal(0);

      const object = expr.object as Literal;
      expect(object.type).to.equal(SyntacticToken.LITERAL);
      expect(object).to.be.an.instanceof(Literal);
      expect(object.value.lexeme).to.equal('Class');
    }

    program.body.forEach(check);
  });

  it('parses single param correctly', () => {
    const program = parse(loadRaw(__dirname, './single-param.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as NewExpression;

      expect(expr.type).to.equal(SyntacticToken.NEW_EXPR);
      expect(expr).to.be.an.instanceof(NewExpression);

      expect(expr.params.length).to.equal(1);

      const param = expr.params[0] as Literal;
      expect(param.type).to.equal(SyntacticToken.LITERAL);
      expect(param).to.be.an.instanceof(Literal);
      expect(param.value.lexeme).to.equal('true');

      const object = expr.object as Literal;
      expect(object.type).to.equal(SyntacticToken.LITERAL);
      expect(object).to.be.an.instanceof(Literal);
      expect(object.value.lexeme).to.equal('Class');
    }

    program.body.forEach(check);
  });

  it('parses multi param correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-param.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as NewExpression;

      expect(expr.type).to.equal(SyntacticToken.NEW_EXPR);
      expect(expr).to.be.an.instanceof(NewExpression);

      expect(expr.params.length).to.equal(2);

      const firstParam = expr.params[0] as Literal;
      expect(firstParam.type).to.equal(SyntacticToken.LITERAL);
      expect(firstParam).to.be.an.instanceof(Literal);
      expect(firstParam.value.lexeme).to.equal('true');

      const secondParam = expr.params[1] as Literal;
      expect(secondParam.type).to.equal(SyntacticToken.LITERAL);
      expect(secondParam).to.be.an.instanceof(Literal);
      expect(secondParam.value.lexeme).to.equal('20');

      const object = expr.object as Literal;
      expect(object.type).to.equal(SyntacticToken.LITERAL);
      expect(object).to.be.an.instanceof(Literal);
      expect(object.value.lexeme).to.equal('Class');
    }

    program.body.forEach(check);
  });

  it('parses member class correctly', () => {
    const program = parse(loadRaw(__dirname, './member-class.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as NewExpression;

      expect(expr.type).to.equal(SyntacticToken.NEW_EXPR);
      expect(expr).to.be.an.instanceof(NewExpression);

      expect(expr.params.length).to.equal(0);

      const memberExpr = expr.object as MemberExpression;
      expect(memberExpr.type).to.equal(SyntacticToken.MEMBER_EXPR);
      expect(memberExpr).to.be.an.instanceof(MemberExpression);

      const object = memberExpr.object as Literal;
      expect(object.type).to.equal(SyntacticToken.LITERAL);
      expect(object).to.be.an.instanceof(Literal);
      expect(object.value.lexeme).to.equal('obj');

      const property = memberExpr.property;
      expect(property.lexeme).to.equal('Class');
    }

    program.body.forEach(check);
  });
});
