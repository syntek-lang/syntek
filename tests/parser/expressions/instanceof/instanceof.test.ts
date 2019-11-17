import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { Identifier, InstanceofExpression } from '../../../../src/grammar/nodes/Expressions';

describe('instanceof', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './instanceof.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as InstanceofExpression;

      expect(expr.type).to.equal(SyntacticToken.INSTANCEOF_EXPR);
      expect(expr).to.be.an.instanceof(InstanceofExpression);

      const left = expr.left as Identifier;
      expect(left.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(left).to.be.an.instanceof(Identifier);
      expect(left.lexeme).to.equal('x');

      expect((expr.right.object as Identifier).lexeme).to.equal('y');
      expect(expr.right.generics.length).to.equal(0);
      expect(expr.right.arrayDepth).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses generic correctly', () => {
    const program = parse(loadRaw(__dirname, './generic.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as InstanceofExpression;

      expect(expr.type).to.equal(SyntacticToken.INSTANCEOF_EXPR);
      expect(expr).to.be.an.instanceof(InstanceofExpression);

      const left = expr.left as Identifier;
      expect(left.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(left).to.be.an.instanceof(Identifier);
      expect(left.lexeme).to.equal('x');

      expect((expr.right.object as Identifier).lexeme).to.equal('A');
      expect(expr.right.generics.length).to.equal(1);

      const generic = expr.right.generics[0];
      expect((generic.object as Identifier).lexeme).to.equal('B');
      expect(generic.generics.length).to.equal(0);
      expect(generic.arrayDepth).to.equal(0);

      expect(expr.right.arrayDepth).to.equal(0);
    }

    program.body.forEach(check);
  });
});
