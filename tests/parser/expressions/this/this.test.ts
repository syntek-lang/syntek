import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { This } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';

describe('this', () => {
  it('parses correctly', () => {
    const program = parse('this');

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as This;

      expect(expr.type).to.equal(SyntacticToken.THIS);
      expect(expr).to.be.an.instanceof(This);
    }

    program.body.forEach(check);
  });
});
