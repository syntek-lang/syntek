import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { LexicalToken } from '../../../../../src/grammar/LexicalToken';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { Literal, BinaryExpression } from '../../../../../src/grammar/nodes/Expressions';

describe('binary', () => {
  describe('comparison', () => {
    it('parses "is" correctly', () => {
      const program = parse(loadRaw(__dirname, './is.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('5');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('3');

        expect(expr.operator.type).to.equal(LexicalToken.IS);
      }

      program.body.forEach(check);
    });

    it('parses "is not" correctly', () => {
      const program = parse(loadRaw(__dirname, './is-not.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('5');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('3');

        expect(expr.operator.type).to.equal(LexicalToken.IS_NOT);
      }

      program.body.forEach(check);
    });

    it('parses "is less than" correctly', () => {
      const program = parse(loadRaw(__dirname, './is-less-than.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('5');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('3');

        expect(expr.operator.type).to.equal(LexicalToken.IS_LESS_THAN);
      }

      program.body.forEach(check);
    });

    it('parses "is greater than" correctly', () => {
      const program = parse(loadRaw(__dirname, './is-greater-than.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('5');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('3');

        expect(expr.operator.type).to.equal(LexicalToken.IS_GREATER_THAN);
      }

      program.body.forEach(check);
    });
  });

  describe('arithmetic', () => {
    it('parses addition correctly', () => {
      const program = parse(loadRaw(__dirname, './addition.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('5');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('10');

        expect(expr.operator.type).to.equal(LexicalToken.PLUS);
      }

      program.body.forEach(check);
    });

    it('parses subtraction correctly', () => {
      const program = parse(loadRaw(__dirname, './subtraction.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('7');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('15');

        expect(expr.operator.type).to.equal(LexicalToken.MINUS);
      }

      program.body.forEach(check);
    });

    it('parses multiplication correctly', () => {
      const program = parse(loadRaw(__dirname, './multiplication.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('2');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('3');

        expect(expr.operator.type).to.equal(LexicalToken.STAR);
      }

      program.body.forEach(check);
    });

    it('parses division correctly', () => {
      const program = parse(loadRaw(__dirname, './division.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('9');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('3');

        expect(expr.operator.type).to.equal(LexicalToken.SLASH);
      }

      program.body.forEach(check);
    });

    it('parses remainder correctly', () => {
      const program = parse(loadRaw(__dirname, './remainder.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('25');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('8');

        expect(expr.operator.type).to.equal(LexicalToken.PERCENT);
      }

      program.body.forEach(check);
    });

    it('parses exponentation correctly', () => {
      const program = parse(loadRaw(__dirname, './exponentation.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('2');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('3');

        expect(expr.operator.type).to.equal(LexicalToken.CARET);
      }

      program.body.forEach(check);
    });
  });

  describe('logical', () => {
    it('parses "and" correctly', () => {
      const program = parse(loadRaw(__dirname, './and.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('true');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('false');

        expect(expr.operator.type).to.equal(LexicalToken.AND);
      }

      program.body.forEach(check);
    });

    it('parses "or" correctly', () => {
      const program = parse(loadRaw(__dirname, './or.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as BinaryExpression;

        expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
        expect(expr).to.be.an.instanceof(BinaryExpression);

        const left = expr.left as Literal;
        expect(left.type).to.equal(SyntacticToken.LITERAL);
        expect(left).to.be.an.instanceof(Literal);
        expect(left.value.lexeme).to.equal('true');

        const right = expr.right as Literal;
        expect(right.type).to.equal(SyntacticToken.LITERAL);
        expect(right).to.be.an.instanceof(Literal);
        expect(right.value.lexeme).to.equal('false');

        expect(expr.operator.type).to.equal(LexicalToken.OR);
      }

      program.body.forEach(check);
    });
  });
});
