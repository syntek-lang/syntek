import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Literal } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ThrowStatement } from '../../../../src/grammar/nodes/Statements';

describe('throw', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './throw.tek'));

    function check(node: Node): void {
      const stmt = node as ThrowStatement;
      expect(stmt.type).to.equal(SyntacticToken.THROW_STMT);
      expect(stmt).to.be.an.instanceof(ThrowStatement);

      const expr = stmt.expression as Literal;
      expect(expr.type).to.equal(SyntacticToken.LITERAL);
      expect(expr).to.be.an.instanceof(Literal);
      expect(expr.value.lexeme).to.equal('5');
    }

    program.body.forEach(check);
  });
});
