import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { LexicalToken } from '../../../../src/grammar/LexicalToken';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import {
  Identifier, IfExpression, ElseExpression, UnaryExpression,
} from '../../../../src/grammar/nodes/Expressions';

function checkBody(nodes: Node[], name: string): void {
  expect(nodes.length).to.equal(1);

  const stmt = nodes[0] as ExpressionStatement;
  expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
  expect(stmt).to.be.an.instanceof(ExpressionStatement);

  const expr = stmt.expression as Identifier;
  expect(expr.type).to.equal(SyntacticToken.IDENTIFIER);
  expect(expr).to.be.an.instanceof(Identifier);
  expect(expr.lexeme).to.equal(name);
}

describe('if', () => {
  it('parses empty if correctly', () => {
    const program = parse(loadRaw(__dirname, './empty.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as IfExpression;
      expect(expr.type).to.equal(SyntacticToken.IF_EXPR);
      expect(expr).to.be.an.instanceof(IfExpression);

      const condition = expr.condition as Identifier;
      expect(condition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(condition).to.be.an.instanceof(Identifier);
      expect(condition.lexeme).to.equal('x');

      expect(expr.body.length).to.equal(0);

      expect(expr.elseClause).to.be.null;
    }

    program.body.forEach(check);
  });

  it('parses single if correctly', () => {
    const program = parse(loadRaw(__dirname, './single-if.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as IfExpression;
      expect(expr.type).to.equal(SyntacticToken.IF_EXPR);
      expect(expr).to.be.an.instanceof(IfExpression);

      const condition = expr.condition as Identifier;
      expect(condition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(condition).to.be.an.instanceof(Identifier);
      expect(condition.lexeme).to.equal('x');

      checkBody(expr.body, 'y');

      expect(expr.elseClause).to.be.null;
    }

    program.body.forEach(check);
  });

  it('parses if with else correctly', () => {
    const program = parse(loadRaw(__dirname, './if-with-else.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as IfExpression;
      expect(expr.type).to.equal(SyntacticToken.IF_EXPR);
      expect(expr).to.be.an.instanceof(IfExpression);

      const condition = expr.condition as Identifier;
      expect(condition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(condition).to.be.an.instanceof(Identifier);
      expect(condition.lexeme).to.equal('x');

      checkBody(expr.body, 'y');

      const elseClause = expr.elseClause as ElseExpression;
      expect(elseClause.type).to.equal(SyntacticToken.ELSE_EXPR);
      expect(elseClause).to.be.an.instanceof(ElseExpression);

      checkBody(elseClause.body, 'z');
    }

    program.body.forEach(check);
  });

  it('parses if with else if correctly', () => {
    const program = parse(loadRaw(__dirname, './if-with-else-if.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as IfExpression;
      expect(expr.type).to.equal(SyntacticToken.IF_EXPR);
      expect(expr).to.be.an.instanceof(IfExpression);

      const condition = expr.condition as Identifier;
      expect(condition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(condition).to.be.an.instanceof(Identifier);
      expect(condition.lexeme).to.equal('x');

      checkBody(expr.body, 'a');

      const secondIf = expr.elseClause as IfExpression;
      expect(secondIf.type).to.equal(SyntacticToken.IF_EXPR);
      expect(secondIf).to.be.an.instanceof(IfExpression);

      const ifCondition = secondIf.condition as Identifier;
      expect(ifCondition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(ifCondition).to.be.an.instanceof(Identifier);
      expect(ifCondition.lexeme).to.equal('y');

      checkBody(secondIf.body, 'b');

      const elseClause = secondIf.elseClause as ElseExpression;
      expect(elseClause.type).to.equal(SyntacticToken.ELSE_EXPR);
      expect(elseClause).to.be.an.instanceof(ElseExpression);

      checkBody(elseClause.body, 'c');
    }

    program.body.forEach(check);
  });

  it('parses wrapped if correctly', () => {
    const program = parse(loadRaw(__dirname, './wrapped.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = ((node as any).expression as any).expression as IfExpression;
      expect(expr.type).to.equal(SyntacticToken.IF_EXPR);
      expect(expr).to.be.an.instanceof(IfExpression);

      const condition = expr.condition as Identifier;
      expect(condition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(condition).to.be.an.instanceof(Identifier);
      expect(condition.lexeme).to.equal('x');

      expect(expr.body.length).to.equal(2);

      const stmt1 = (expr.body[0] as ExpressionStatement).expression as Identifier;
      expect(stmt1).to.be.an.instanceOf(Identifier);
      expect(stmt1.lexeme).to.equal('y');

      const stmt2 = (expr.body[1] as ExpressionStatement).expression as UnaryExpression;
      expect(stmt2).to.be.an.instanceOf(UnaryExpression);
      expect(stmt2.operator.type).to.equal(LexicalToken.MINUS);
      expect((stmt2.right as Identifier).lexeme).to.equal('z');

      expect((expr.elseClause as ElseExpression).body.length).to.equal(0);
    }

    program.body.forEach(check);
  });
});
