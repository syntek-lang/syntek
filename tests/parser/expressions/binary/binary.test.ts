import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { LexicalToken } from '../../../../src/grammar/LexicalToken';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { Identifier, BinaryExpression } from '../../../../src/grammar/nodes/Expressions';

function checkIdentifier(node: Node, name: string): void {
  expect(node.type).to.equal(SyntacticToken.IDENTIFIER);
  expect(node).to.be.an.instanceof(Identifier);
  expect((node as Identifier).lexeme).to.equal(name);
}

function check(node: Node, operator: LexicalToken): void {
  expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
  expect(node).to.be.an.instanceof(ExpressionStatement);

  const expr = (node as ExpressionStatement).expression as BinaryExpression;

  expect(expr.type).to.equal(SyntacticToken.BINARY_EXPR);
  expect(expr).to.be.an.instanceof(BinaryExpression);

  checkIdentifier(expr.left, 'x');
  checkIdentifier(expr.right, 'y');

  expect(expr.operator.type).to.equal(operator);
}

describe('binary', () => {
  describe('comparison', () => {
    it('parses "==" correctly', () => {
      parse(loadRaw(__dirname, './comparison/equal.tek'))
        .body
        .forEach(node => check(node, LexicalToken.EQUAL_EQUAL));
    });

    it('parses "!=" correctly', () => {
      parse(loadRaw(__dirname, './comparison/not-equal.tek'))
        .body
        .forEach(node => check(node, LexicalToken.BANG_EQUAL));
    });

    it('parses "<" correctly', () => {
      parse(loadRaw(__dirname, './comparison/less.tek'))
        .body
        .forEach(node => check(node, LexicalToken.LT));
    });

    it('parses "<=" correctly', () => {
      parse(loadRaw(__dirname, './comparison/less-equal.tek'))
        .body
        .forEach(node => check(node, LexicalToken.LT_EQUAL));
    });

    it('parses ">" correctly', () => {
      parse(loadRaw(__dirname, './comparison/greater.tek'))
        .body
        .forEach(node => check(node, LexicalToken.GT));
    });

    it('parses ">=" correctly', () => {
      parse(loadRaw(__dirname, './comparison/greater-equal.tek'))
        .body
        .forEach(node => check(node, LexicalToken.GT_EQUAL));
    });
  });

  describe('arithmetic', () => {
    it('parses addition correctly', () => {
      parse(loadRaw(__dirname, './arithmetic/addition.tek'))
        .body
        .forEach(node => check(node, LexicalToken.PLUS));
    });

    it('parses subtraction correctly', () => {
      parse(loadRaw(__dirname, './arithmetic/subtraction.tek'))
        .body
        .forEach(node => check(node, LexicalToken.MINUS));
    });

    it('parses wrapped subtraction correctly', () => {
      const program = parse(loadRaw(__dirname, './arithmetic/wrapped-subtraction.tek'));

      function customCheck(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = ((node as any).expression as any).expression as BinaryExpression;
        const nested = (expr.left as any).expression as BinaryExpression;

        checkIdentifier(nested.left, 'x');
        checkIdentifier(nested.right, 'y');
        checkIdentifier(expr.right, 'z');

        expect(expr.operator.type).to.equal(LexicalToken.MINUS);
        expect(nested.operator.type).to.equal(LexicalToken.MINUS);
      }

      program.body.forEach(customCheck);
    });

    it('parses multiplication correctly', () => {
      parse(loadRaw(__dirname, './arithmetic/multiplication.tek'))
        .body
        .forEach(node => check(node, LexicalToken.STAR));
    });

    it('parses division correctly', () => {
      parse(loadRaw(__dirname, './arithmetic/division.tek'))
        .body
        .forEach(node => check(node, LexicalToken.SLASH));
    });

    it('parses remainder correctly', () => {
      parse(loadRaw(__dirname, './arithmetic/remainder.tek'))
        .body
        .forEach(node => check(node, LexicalToken.PERCENT));
    });

    it('parses exponentation correctly', () => {
      parse(loadRaw(__dirname, './arithmetic/exponentation.tek'))
        .body
        .forEach(node => check(node, LexicalToken.CARET));
    });
  });

  describe('logical', () => {
    it('parses "and" correctly', () => {
      parse(loadRaw(__dirname, './logical/and.tek'))
        .body
        .forEach(node => check(node, LexicalToken.AND));
    });

    it('parses "or" correctly', () => {
      parse(loadRaw(__dirname, './logical/or.tek'))
        .body
        .forEach(node => check(node, LexicalToken.OR));
    });
  });
});
