import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { YieldStatement } from '../../../../src/grammar/nodes/Statements';

describe('yield', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './yield.tek'));

    function check(node: Node): void {
      const stmt = node as YieldStatement;
      expect(stmt.type).to.equal(SyntacticToken.YIELD_STMT);
      expect(stmt).to.be.an.instanceof(YieldStatement);

      const expr = stmt.expression as Identifier;
      expect(expr.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(expr).to.be.an.instanceof(Identifier);
      expect(expr.lexeme).to.equal('x');
    }

    program.body.forEach(check);
  });
});
