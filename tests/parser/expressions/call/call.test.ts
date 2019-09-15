import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { Literal, Identifier, CallExpression } from '../../../../src/grammar/nodes/Expressions';

describe('call', () => {
  it('parses no params correctly', () => {
    const program = parse(loadRaw(__dirname, './no-params.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as CallExpression;

      expect(expr.type).to.equal(SyntacticToken.CALL_EXPR);
      expect(expr).to.be.an.instanceof(CallExpression);
      expect(expr.genericArgs.length).to.equal(0);
      expect(expr.params.length).to.equal(0);

      const object = expr.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('fn');
    }

    program.body.forEach(check);
  });

  it('parses single param correctly', () => {
    const program = parse(loadRaw(__dirname, './single-param.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as CallExpression;

      expect(expr.type).to.equal(SyntacticToken.CALL_EXPR);
      expect(expr).to.be.an.instanceof(CallExpression);
      expect(expr.genericArgs.length).to.equal(0);

      expect(expr.params.length).to.equal(1);

      const param = expr.params[0] as Literal;
      expect(param.type).to.equal(SyntacticToken.LITERAL);
      expect(param).to.be.an.instanceof(Literal);
      expect(param.value.lexeme).to.equal('true');

      const object = expr.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('fn');
    }

    program.body.forEach(check);
  });

  it('parses multi param correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-param.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as CallExpression;

      expect(expr.type).to.equal(SyntacticToken.CALL_EXPR);
      expect(expr).to.be.an.instanceof(CallExpression);
      expect(expr.genericArgs.length).to.equal(0);

      expect(expr.params.length).to.equal(2);

      const firstParam = expr.params[0] as Literal;
      expect(firstParam.type).to.equal(SyntacticToken.LITERAL);
      expect(firstParam).to.be.an.instanceof(Literal);
      expect(firstParam.value.lexeme).to.equal('true');

      const secondParam = expr.params[1] as Literal;
      expect(secondParam.type).to.equal(SyntacticToken.LITERAL);
      expect(secondParam).to.be.an.instanceof(Literal);
      expect(secondParam.value.lexeme).to.equal('20');

      const object = expr.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('fn');
    }

    program.body.forEach(check);
  });

  it('parses generic correctly', () => {
    const program = parse(loadRaw(__dirname, './generic.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as CallExpression;

      expect(expr.type).to.equal(SyntacticToken.CALL_EXPR);
      expect(expr).to.be.an.instanceof(CallExpression);

      expect(expr.genericArgs.length).to.equal(1);

      const generic = expr.genericArgs[0];
      expect((generic.type as Identifier).lexeme).to.equal('T');
      expect(generic.generics.length).to.equal(0);
      expect(generic.arrayDepth).to.equal(0);

      expect(expr.params.length).to.equal(0);

      const object = expr.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('fn');
    }

    program.body.forEach(check);
  });
});
