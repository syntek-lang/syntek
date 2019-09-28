import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { LexicalToken } from '../../../../src/grammar/LexicalToken';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { Identifier, MemberExpression } from '../../../../src/grammar/nodes/Expressions';

describe('member', () => {
  it('parses identifier correctly', () => {
    const program = parse(loadRaw(__dirname, './identifier.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as MemberExpression;

      expect(expr.type).to.equal(SyntacticToken.MEMBER_EXPR);
      expect(expr).to.be.an.instanceof(MemberExpression);

      const object = expr.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('x');

      const property = expr.property;
      expect(property.type).to.equal(LexicalToken.IDENTIFIER);
      expect(property.lexeme).to.equal('y');
    }

    program.body.forEach(check);
  });

  it('parses super correctly', () => {
    const program = parse(loadRaw(__dirname, './super.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as MemberExpression;

      expect(expr.type).to.equal(SyntacticToken.MEMBER_EXPR);
      expect(expr).to.be.an.instanceof(MemberExpression);

      const object = expr.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('x');

      const property = expr.property;
      expect(property.type).to.equal(LexicalToken.SUPER);
      expect(property.lexeme).to.equal('super');
    }

    program.body.forEach(check);
  });
});
