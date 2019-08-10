import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { Literal, Identifier, InstanceofExpression } from '../../../../../src/grammar/nodes/Expressions';

describe('instanceof', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './instanceof.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as InstanceofExpression;

      expect(expr.type).to.equal(SyntacticToken.INSTANCEOF_EXPR);
      expect(expr).to.be.an.instanceof(InstanceofExpression);

      const left = expr.left as Literal;
      expect(left.type).to.equal(SyntacticToken.LITERAL);
      expect(left).to.be.an.instanceof(Literal);
      expect(left.value.lexeme).to.equal('true');

      const right = expr.right as Identifier;
      expect(right.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(right).to.be.an.instanceof(Identifier);
      expect(right.lexeme).to.equal('Boolean');
    }

    program.body.forEach(check);
  });
});
