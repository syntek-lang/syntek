import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../../TestUtils';

import { Node } from '../../../../../../src/grammar/Node';
import { LexicalToken } from '../../../../../../src/grammar/LexicalToken';
import { SyntacticToken } from '../../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../../src/grammar/nodes/Statements';
import { UnaryExpression, Literal } from '../../../../../../src/grammar/nodes/Expressions';

describe('plus', () => {
  it('parses positive number', () => {
    const program = parse(loadRaw(__dirname, './positive.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as UnaryExpression;

      expect(expr.type).to.equal(SyntacticToken.UNARY_EXPR);
      expect(expr).to.be.an.instanceof(UnaryExpression);

      const right = expr.right as Literal;
      expect(right.type).to.equal(SyntacticToken.LITERAL);
      expect(right).to.be.an.instanceof(Literal);

      expect(expr.operator.type).to.equal(LexicalToken.PLUS);
      expect(right.value.lexeme).to.equal('10');
    }

    program.body.forEach(check);
  });
});
