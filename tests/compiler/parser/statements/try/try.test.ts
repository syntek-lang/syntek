import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { Identifier } from '../../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement, TryStatement } from '../../../../../src/grammar/nodes/Statements';

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

describe('try', () => {
  it('parses correctly without type', () => {
    const program = parse(loadRaw(__dirname, './without-type.tek'));

    function check(node: Node): void {
      const stmt = node as TryStatement;
      expect(stmt.type).to.equal(SyntacticToken.TRY_STMT);
      expect(stmt).to.be.an.instanceof(TryStatement);

      checkBody(stmt.tryBody);

      expect(stmt.identifier.lexeme).to.equal('error');
      expect(stmt.variableType).to.be.null;

      checkBody(stmt.catchBody);
    }

    program.body.forEach(check);
  });

  it('parses correctly with type, no array depth', () => {
    const program = parse(loadRaw(__dirname, './with-type-no-array-depth.tek'));

    function check(node: Node): void {
      const stmt = node as TryStatement;
      expect(stmt.type).to.equal(SyntacticToken.TRY_STMT);
      expect(stmt).to.be.an.instanceof(TryStatement);

      checkBody(stmt.tryBody);

      expect(stmt.identifier.lexeme).to.equal('error');

      expect(stmt.variableType).to.not.be.null;
      expect(stmt.variableType!.type.lexeme).to.equal('Error');
      expect(stmt.variableType!.arrayDepth).to.equal(0);

      checkBody(stmt.catchBody);
    }

    program.body.forEach(check);
  });

  it('parses correctly with type, no array depth', () => {
    const program = parse(loadRaw(__dirname, './with-type-single-array-depth.tek'));

    function check(node: Node): void {
      const stmt = node as TryStatement;
      expect(stmt.type).to.equal(SyntacticToken.TRY_STMT);
      expect(stmt).to.be.an.instanceof(TryStatement);

      checkBody(stmt.tryBody);

      expect(stmt.identifier.lexeme).to.equal('error');

      expect(stmt.variableType).to.not.be.null;
      expect(stmt.variableType!.type.lexeme).to.equal('Error');
      expect(stmt.variableType!.arrayDepth).to.equal(1);

      checkBody(stmt.catchBody);
    }

    program.body.forEach(check);
  });

  it('parses correctly with type, multi array depth', () => {
    const program = parse(loadRaw(__dirname, './with-type-multi-array-depth.tek'));

    function check(node: Node): void {
      const stmt = node as TryStatement;
      expect(stmt.type).to.equal(SyntacticToken.TRY_STMT);
      expect(stmt).to.be.an.instanceof(TryStatement);

      checkBody(stmt.tryBody);

      expect(stmt.identifier.lexeme).to.equal('error');

      expect(stmt.variableType).to.not.be.null;
      expect(stmt.variableType!.type.lexeme).to.equal('Error');
      expect(stmt.variableType!.arrayDepth).to.equal(2);

      checkBody(stmt.catchBody);
    }

    program.body.forEach(check);
  });
});