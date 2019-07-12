import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { Literal, Identifier } from '../../../../../src/grammar/nodes/Expressions';
import { ExpressionStatement, RepeatStatement } from '../../../../../src/grammar/nodes/Statements';

function checkBody(nodes: Node[]): void {
  const names = ['one', 'two'];

  expect(nodes.length).to.equal(names.length);

  for (let i = 0; i < names.length; i += 1) {
    const stmt = nodes[i] as ExpressionStatement;
    expect(stmt.type).to.equal(SyntacticToken.EXPRESSION_STMT);
    expect(stmt).to.be.an.instanceof(ExpressionStatement);

    const expr = stmt.expression as Identifier;
    expect(expr.type).to.equal(SyntacticToken.IDENTIFIER);
    expect(expr).to.be.an.instanceof(Identifier);
    expect(expr.identifier.lexeme).to.equal(names[i]);
  }
}

describe('repeat', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './repeat.tek'));

    function check(node: Node): void {
      const stmt = node as RepeatStatement;
      expect(stmt.type).to.equal(SyntacticToken.REPEAT_STMT);
      expect(stmt).to.be.an.instanceof(RepeatStatement);

      const amount = stmt.amount as Literal;
      expect(amount.type).to.equal(SyntacticToken.LITERAL);
      expect(amount).to.be.an.instanceof(Literal);
      expect(amount.value.lexeme).to.equal('10');

      checkBody(stmt.body);
    }

    program.body.forEach(check);
  });
});
