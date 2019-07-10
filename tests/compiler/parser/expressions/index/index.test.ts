import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../TestUtils';

import { Node } from '../../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { Literal, IndexExpression } from '../../../../../src/grammar/nodes/Expressions';

describe('index', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './index.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as IndexExpression;

      expect(expr.type).to.equal(SyntacticToken.INDEX_EXPR);
      expect(expr).to.be.an.instanceof(IndexExpression);

      const object = expr.object as Literal;
      expect(object.type).to.equal(SyntacticToken.LITERAL);
      expect(object).to.be.an.instanceof(Literal);
      expect(object.value.lexeme).to.equal('array');

      const index = expr.index as Literal;
      expect(index.type).to.equal(SyntacticToken.LITERAL);
      expect(index).to.be.an.instanceof(Literal);
      expect(index.value.lexeme).to.equal('0');
    }

    program.body.forEach(check);
  });
});
