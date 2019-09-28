import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { Identifier, WrappedExpression } from '../../../../src/grammar/nodes/Expressions';

describe('wrapped', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './wrapped.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as WrappedExpression;

      expect(expr.type).to.equal(SyntacticToken.WRAPPED_EXPR);
      expect(expr).to.be.an.instanceof(WrappedExpression);

      const content = expr.expression as Identifier;
      expect(content.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(content).to.be.an.instanceof(Identifier);
      expect(content.lexeme).to.equal('x');
    }

    program.body.forEach(check);
  });
});
