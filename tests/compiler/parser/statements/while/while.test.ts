import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { Literal, Identifier } from '../../../../../src/grammar/nodes/Expressions';
import { ExpressionStatement, WhileStatement } from '../../../../../src/grammar/nodes/Statements';

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

describe('while', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './while.tek'));

    function check(node: Node): void {
      const stmt = node as WhileStatement;
      expect(stmt.type).to.equal(SyntacticToken.WHILE_STMT);
      expect(stmt).to.be.an.instanceof(WhileStatement);

      const condition = stmt.condition as Literal;
      expect(condition.type).to.equal(SyntacticToken.LITERAL);
      expect(condition).to.be.an.instanceof(Literal);
      expect(condition.value.lexeme).to.equal('true');

      checkBody(stmt.body);
    }

    program.body.forEach(check);
  });
});
