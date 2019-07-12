import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { Literal, Identifier } from '../../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement, IfStatement, ElseStatement } from '../../../../../src/grammar/nodes/Statements';

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

describe('if', () => {
  it('parses single if correctly', () => {
    const program = parse(loadRaw(__dirname, './single-if.tek'));

    function check(node: Node): void {
      const stmt = node as IfStatement;
      expect(stmt.type).to.equal(SyntacticToken.IF_STMT);
      expect(stmt).to.be.an.instanceof(IfStatement);

      const condition = stmt.condition as Literal;
      expect(condition.type).to.equal(SyntacticToken.LITERAL);
      expect(condition).to.be.an.instanceof(Literal);
      expect(condition.value.lexeme).to.equal('true');
      checkBody(stmt.body);

      expect(stmt.elseClause).to.be.null;
    }

    program.body.forEach(check);
  });

  it('parses if with else correctly', () => {
    const program = parse(loadRaw(__dirname, './if-with-else.tek'));

    function check(node: Node): void {
      const stmt = node as IfStatement;
      expect(stmt.type).to.equal(SyntacticToken.IF_STMT);
      expect(stmt).to.be.an.instanceof(IfStatement);

      const condition = stmt.condition as Literal;
      expect(condition.type).to.equal(SyntacticToken.LITERAL);
      expect(condition).to.be.an.instanceof(Literal);
      expect(condition.value.lexeme).to.equal('true');
      checkBody(stmt.body);

      const elseClause = stmt.elseClause as ElseStatement;
      expect(elseClause.type).to.equal(SyntacticToken.ELSE_STMT);
      expect(elseClause).to.be.an.instanceof(ElseStatement);
      checkBody(elseClause.body);
    }

    program.body.forEach(check);
  });

  it('parses if with else if correctly', () => {
    const program = parse(loadRaw(__dirname, './if-with-else-if.tek'));

    function check(node: Node): void {
      const stmt = node as IfStatement;
      expect(stmt.type).to.equal(SyntacticToken.IF_STMT);
      expect(stmt).to.be.an.instanceof(IfStatement);

      const condition = stmt.condition as Literal;
      expect(condition.type).to.equal(SyntacticToken.LITERAL);
      expect(condition).to.be.an.instanceof(Literal);
      expect(condition.value.lexeme).to.equal('true');
      checkBody(stmt.body);

      const secondIf = stmt.elseClause as IfStatement;
      expect(secondIf.type).to.equal(SyntacticToken.IF_STMT);
      expect(secondIf).to.be.an.instanceof(IfStatement);
      checkBody(secondIf.body);

      const elseClause = secondIf.elseClause as ElseStatement;
      expect(elseClause.type).to.equal(SyntacticToken.ELSE_STMT);
      expect(elseClause).to.be.an.instanceof(ElseStatement);
      checkBody(elseClause.body);
    }

    program.body.forEach(check);
  });
});
