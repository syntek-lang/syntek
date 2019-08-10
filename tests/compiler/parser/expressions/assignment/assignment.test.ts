import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { AssignmentExpression, IndexExpression, Identifier } from '../../../../../src/grammar/nodes/Expressions';

describe('assignment', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './assignment.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as AssignmentExpression;

      expect(expr.type).to.equal(SyntacticToken.ASSIGNMENT_EXPR);
      expect(expr).to.be.an.instanceof(AssignmentExpression);

      const left = expr.left as IndexExpression;
      expect(left.type).to.equal(SyntacticToken.INDEX_EXPR);
      expect(left).to.be.an.instanceof(IndexExpression);

      const object = left.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('x');

      const index = left.index as Identifier;
      expect(index.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(index).to.be.an.instanceof(Identifier);
      expect(index.lexeme).to.equal('y');

      const value = expr.value as Identifier;
      expect(value.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(value).to.be.an.instanceof(Identifier);
      expect(value.lexeme).to.equal('z');
    }

    program.body.forEach(check);
  });
});
