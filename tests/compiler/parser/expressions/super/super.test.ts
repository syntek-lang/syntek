import 'mocha';
import { expect } from 'chai';

import { parse } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { Super } from '../../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';

describe('super', () => {
  it('parses correctly', () => {
    const program = parse('super');

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as Super;

      expect(expr.type).to.equal(SyntacticToken.SUPER);
      expect(expr).to.be.an.instanceof(Super);
    }

    program.body.forEach(check);
  });
});
