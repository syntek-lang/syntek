import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { VariableDeclaration } from '../../../../src/grammar/nodes/Declarations';
import { Literal, ObjectExpression } from '../../../../src/grammar/nodes/Expressions';

describe('object', () => {
  it('parses no props correctly', () => {
    const program = parse(loadRaw(__dirname, './no-props.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as ObjectExpression;

      expect(expr.type).to.equal(SyntacticToken.OBJECT_EXPR);
      expect(expr).to.be.an.instanceof(ObjectExpression);

      expect(expr.props.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses single prop correctly', () => {
    const program = parse(loadRaw(__dirname, './single-prop.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as ObjectExpression;

      expect(expr.type).to.equal(SyntacticToken.OBJECT_EXPR);
      expect(expr).to.be.an.instanceof(ObjectExpression);

      expect(expr.props.length).to.equal(1);

      const prop = expr.props[0] as VariableDeclaration;
      expect(prop.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(prop).to.be.an.instanceof(VariableDeclaration);
      expect(prop.identifier.lexeme).to.equal('x');

      const value = prop.value as Literal;
      expect(value.type).to.equal(SyntacticToken.LITERAL);
      expect(value).to.be.an.instanceof(Literal);
      expect(value.value.lexeme).to.equal('5');
    }

    program.body.forEach(check);
  });

  it('parses multi prop correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-prop.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as ObjectExpression;

      expect(expr.type).to.equal(SyntacticToken.OBJECT_EXPR);
      expect(expr).to.be.an.instanceof(ObjectExpression);

      expect(expr.props.length).to.equal(2);

      const firstProp = expr.props[0] as VariableDeclaration;
      expect(firstProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(firstProp).to.be.an.instanceof(VariableDeclaration);
      expect(firstProp.identifier.lexeme).to.equal('x');

      const firstValue = firstProp.value as Literal;
      expect(firstValue.type).to.equal(SyntacticToken.LITERAL);
      expect(firstValue).to.be.an.instanceof(Literal);
      expect(firstValue.value.lexeme).to.equal('5');

      const secondProp = expr.props[1] as VariableDeclaration;
      expect(secondProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(secondProp).to.be.an.instanceof(VariableDeclaration);
      expect(secondProp.identifier.lexeme).to.equal('y');

      const secondValue = secondProp.value as Literal;
      expect(secondValue.type).to.equal(SyntacticToken.LITERAL);
      expect(secondValue).to.be.an.instanceof(Literal);
      expect(secondValue.value.lexeme).to.equal('10');
    }

    program.body.forEach(check);
  });

  describe('nested', () => {
    it('parses no props correctly', () => {
      const program = parse(loadRaw(__dirname, './nested-no-props.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as ObjectExpression;

        expect(expr.type).to.equal(SyntacticToken.OBJECT_EXPR);
        expect(expr).to.be.an.instanceof(ObjectExpression);

        expect(expr.props.length).to.equal(2);

        const firstProp = expr.props[0] as VariableDeclaration;
        expect(firstProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(firstProp).to.be.an.instanceof(VariableDeclaration);
        expect(firstProp.identifier.lexeme).to.equal('x');

        const firstValue = firstProp.value as Literal;
        expect(firstValue.type).to.equal(SyntacticToken.LITERAL);
        expect(firstValue).to.be.an.instanceof(Literal);
        expect(firstValue.value.lexeme).to.equal('5');

        const secondProp = expr.props[1] as VariableDeclaration;
        expect(secondProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(secondProp).to.be.an.instanceof(VariableDeclaration);
        expect(secondProp.identifier.lexeme).to.equal('y');

        const secondValue = secondProp.value as ObjectExpression;
        expect(secondValue.type).to.equal(SyntacticToken.OBJECT_EXPR);
        expect(secondValue).to.be.an.instanceof(ObjectExpression);

        expect(secondValue.props.length).to.equal(0);
      }

      program.body.forEach(check);
    });

    it('parses single prop correctly', () => {
      const program = parse(loadRaw(__dirname, './nested-single-prop.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as ObjectExpression;

        expect(expr.type).to.equal(SyntacticToken.OBJECT_EXPR);
        expect(expr).to.be.an.instanceof(ObjectExpression);

        expect(expr.props.length).to.equal(2);

        const firstProp = expr.props[0] as VariableDeclaration;
        expect(firstProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(firstProp).to.be.an.instanceof(VariableDeclaration);
        expect(firstProp.identifier.lexeme).to.equal('x');

        const firstValue = firstProp.value as Literal;
        expect(firstValue.type).to.equal(SyntacticToken.LITERAL);
        expect(firstValue).to.be.an.instanceof(Literal);
        expect(firstValue.value.lexeme).to.equal('5');

        const secondProp = expr.props[1] as VariableDeclaration;
        expect(secondProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(secondProp).to.be.an.instanceof(VariableDeclaration);
        expect(secondProp.identifier.lexeme).to.equal('y');

        const secondValue = secondProp.value as ObjectExpression;
        expect(secondValue.type).to.equal(SyntacticToken.OBJECT_EXPR);
        expect(secondValue).to.be.an.instanceof(ObjectExpression);

        expect(secondValue.props.length).to.equal(1);

        const nestedProp = secondValue.props[0] as VariableDeclaration;
        expect(nestedProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(nestedProp).to.be.an.instanceof(VariableDeclaration);
        expect(nestedProp.identifier.lexeme).to.equal('x');

        const nestedValue = nestedProp.value as Literal;
        expect(nestedValue.type).to.equal(SyntacticToken.LITERAL);
        expect(nestedValue).to.be.an.instanceof(Literal);
        expect(nestedValue.value.lexeme).to.equal('10');
      }

      program.body.forEach(check);
    });

    it('parses multi prop correctly', () => {
      const program = parse(loadRaw(__dirname, './nested-multi-prop.tek'));

      function check(node: Node): void {
        expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
        expect(node).to.be.an.instanceof(ExpressionStatement);

        const expr = (node as ExpressionStatement).expression as ObjectExpression;

        expect(expr.type).to.equal(SyntacticToken.OBJECT_EXPR);
        expect(expr).to.be.an.instanceof(ObjectExpression);

        expect(expr.props.length).to.equal(2);

        const firstProp = expr.props[0] as VariableDeclaration;
        expect(firstProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(firstProp).to.be.an.instanceof(VariableDeclaration);
        expect(firstProp.identifier.lexeme).to.equal('x');

        const firstValue = firstProp.value as Literal;
        expect(firstValue.type).to.equal(SyntacticToken.LITERAL);
        expect(firstValue).to.be.an.instanceof(Literal);
        expect(firstValue.value.lexeme).to.equal('5');

        const secondProp = expr.props[1] as VariableDeclaration;
        expect(secondProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(secondProp).to.be.an.instanceof(VariableDeclaration);
        expect(secondProp.identifier.lexeme).to.equal('y');

        const secondValue = secondProp.value as ObjectExpression;
        expect(secondValue.type).to.equal(SyntacticToken.OBJECT_EXPR);
        expect(secondValue).to.be.an.instanceof(ObjectExpression);

        expect(secondValue.props.length).to.equal(2);

        const firstNestedProp = secondValue.props[0] as VariableDeclaration;
        expect(firstNestedProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(firstNestedProp).to.be.an.instanceof(VariableDeclaration);
        expect(firstNestedProp.identifier.lexeme).to.equal('x');

        const firstNestedValue = firstNestedProp.value as Literal;
        expect(firstNestedValue.type).to.equal(SyntacticToken.LITERAL);
        expect(firstNestedValue).to.be.an.instanceof(Literal);
        expect(firstNestedValue.value.lexeme).to.equal('10');

        const secondNestedProp = secondValue.props[1] as VariableDeclaration;
        expect(secondNestedProp.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(secondNestedProp).to.be.an.instanceof(VariableDeclaration);
        expect(secondNestedProp.identifier.lexeme).to.equal('y');

        const secondNestedValue = secondNestedProp.value as Literal;
        expect(secondNestedValue.type).to.equal(SyntacticToken.LITERAL);
        expect(secondNestedValue).to.be.an.instanceof(Literal);
        expect(secondNestedValue.value.lexeme).to.equal('15');
      }

      program.body.forEach(check);
    });
  });
});
