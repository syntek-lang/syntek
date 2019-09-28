import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { Identifier, ArrayExpression } from '../../../../src/grammar/nodes/Expressions';

describe('array', () => {
  it('parses no params correctly', () => {
    const program = parse(loadRaw(__dirname, './no-params.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as ArrayExpression;

      expect(expr.type).to.equal(SyntacticToken.ARRAY_EXPR);
      expect(expr).to.be.an.instanceof(ArrayExpression);

      expect(expr.content.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses single param correctly', () => {
    const program = parse(loadRaw(__dirname, './single-param.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as ArrayExpression;

      expect(expr.type).to.equal(SyntacticToken.ARRAY_EXPR);
      expect(expr).to.be.an.instanceof(ArrayExpression);

      expect(expr.content.length).to.equal(1);

      const param = expr.content[0] as Identifier;
      expect(param.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(param).to.be.an.instanceof(Identifier);
      expect(param.lexeme).to.equal('x');
    }

    program.body.forEach(check);
  });

  it('parses multi param correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-param.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as ArrayExpression;

      expect(expr.type).to.equal(SyntacticToken.ARRAY_EXPR);
      expect(expr).to.be.an.instanceof(ArrayExpression);

      expect(expr.content.length).to.equal(2);

      const firstParam = expr.content[0] as Identifier;
      expect(firstParam.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(firstParam).to.be.an.instanceof(Identifier);
      expect(firstParam.lexeme).to.equal('x');

      const secondParam = expr.content[1] as Identifier;
      expect(secondParam.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(secondParam).to.be.an.instanceof(Identifier);
      expect(secondParam.lexeme).to.equal('y');
    }

    program.body.forEach(check);
  });
});
