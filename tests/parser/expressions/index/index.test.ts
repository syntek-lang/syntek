import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { Identifier, IndexExpression } from '../../../../src/grammar/nodes/Expressions';

describe('index', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './index.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as IndexExpression;

      expect(expr.type).to.equal(SyntacticToken.INDEX_EXPR);
      expect(expr).to.be.an.instanceof(IndexExpression);

      const object = expr.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('x');

      const index = expr.index as Identifier;
      expect(index.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(index).to.be.an.instanceof(Identifier);
      expect(index.lexeme).to.equal('y');
    }

    program.body.forEach(check);
  });
});
