import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { Identifier, AsyncExpression } from '../../../../../src/grammar/nodes/Expressions';

describe('async', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './async.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as AsyncExpression;

      expect(expr.type).to.equal(SyntacticToken.ASYNC_EXPR);
      expect(expr).to.be.an.instanceof(AsyncExpression);

      const literal = expr.expression as Identifier;
      expect(literal.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(literal).to.be.an.instanceof(Identifier);
      expect(literal.identifier.lexeme).to.equal('Foo');
    }

    program.body.forEach(check);
  });
});
