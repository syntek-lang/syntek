import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement, WhileStatement } from '../../../../src/grammar/nodes/Statements';

describe('while', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './while.tek'));

    function check(node: Node): void {
      const stmt = node as WhileStatement;
      expect(stmt.type).to.equal(SyntacticToken.WHILE_STMT);
      expect(stmt).to.be.an.instanceof(WhileStatement);

      const condition = stmt.condition as Identifier;
      expect(condition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(condition).to.be.an.instanceof(Identifier);
      expect(condition.lexeme).to.equal('x');

      expect(stmt.body.length).to.equal(1);
      expect(((stmt.body[0] as ExpressionStatement).expression as Identifier).lexeme).to.equal('y');
    }

    program.body.forEach(check);
  });
});
