import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement, ForStatement } from '../../../../src/grammar/nodes/Statements';

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
    expect(expr.lexeme).to.equal(names[i]);
  }
}

describe('for', () => {
  it('parses correctly without type', () => {
    const program = parse(loadRaw(__dirname, './without-type.tek'));

    function check(node: Node): void {
      const stmt = node as ForStatement;
      expect(stmt.type).to.equal(SyntacticToken.FOR_STMT);
      expect(stmt).to.be.an.instanceof(ForStatement);

      expect(stmt.identifier.lexeme).to.equal('x');
      expect(stmt.variableType).to.be.null;

      const object = stmt.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('y');

      checkBody(stmt.body);
    }

    program.body.forEach(check);
  });

  it('parses correctly with type, no array depth', () => {
    const program = parse(loadRaw(__dirname, './with-type-no-array-depth.tek'));

    function check(node: Node): void {
      const stmt = node as ForStatement;
      expect(stmt.type).to.equal(SyntacticToken.FOR_STMT);
      expect(stmt).to.be.an.instanceof(ForStatement);

      expect(stmt.identifier.lexeme).to.equal('x');

      expect(stmt.variableType).to.not.be.null;
      expect((stmt.variableType!.object as Identifier).lexeme).to.equal('Number');
      expect(stmt.variableType!.generics.length).to.equal(0);
      expect(stmt.variableType!.arrayDepth).to.equal(0);

      const object = stmt.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('y');

      checkBody(stmt.body);
    }

    program.body.forEach(check);
  });

  it('parses correctly with type, single array depth', () => {
    const program = parse(loadRaw(__dirname, './with-type-single-array-depth.tek'));

    function check(node: Node): void {
      const stmt = node as ForStatement;
      expect(stmt.type).to.equal(SyntacticToken.FOR_STMT);
      expect(stmt).to.be.an.instanceof(ForStatement);

      expect(stmt.identifier.lexeme).to.equal('x');

      expect(stmt.variableType).to.not.be.null;
      expect((stmt.variableType!.object as Identifier).lexeme).to.equal('Number');
      expect(stmt.variableType!.generics.length).to.equal(0);
      expect(stmt.variableType!.arrayDepth).to.equal(1);

      const object = stmt.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('y');

      checkBody(stmt.body);
    }

    program.body.forEach(check);
  });

  it('parses correctly with type, multi array depth', () => {
    const program = parse(loadRaw(__dirname, './with-type-multi-array-depth.tek'));

    function check(node: Node): void {
      const stmt = node as ForStatement;
      expect(stmt.type).to.equal(SyntacticToken.FOR_STMT);
      expect(stmt).to.be.an.instanceof(ForStatement);

      expect(stmt.identifier.lexeme).to.equal('x');

      expect(stmt.variableType).to.not.be.null;
      expect((stmt.variableType!.object as Identifier).lexeme).to.equal('Number');
      expect(stmt.variableType!.generics.length).to.equal(0);
      expect(stmt.variableType!.arrayDepth).to.equal(2);

      const object = stmt.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('y');

      checkBody(stmt.body);
    }

    program.body.forEach(check);
  });

  it('parses correctly with generic', () => {
    const program = parse(loadRaw(__dirname, './generic.tek'));

    function check(node: Node): void {
      const stmt = node as ForStatement;
      expect(stmt.type).to.equal(SyntacticToken.FOR_STMT);
      expect(stmt).to.be.an.instanceof(ForStatement);

      expect(stmt.identifier.lexeme).to.equal('x');

      expect(stmt.variableType).to.not.be.null;
      expect((stmt.variableType!.object as Identifier).lexeme).to.equal('A');

      expect(stmt.variableType!.generics.length).to.equal(1);
      const generic = stmt.variableType!.generics[0];
      expect((generic.object as Identifier).lexeme).to.equal('B');
      expect(generic.generics.length).to.equal(0);
      expect(generic.arrayDepth).to.equal(0);

      expect(stmt.variableType!.arrayDepth).to.equal(0);

      const object = stmt.object as Identifier;
      expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(object).to.be.an.instanceof(Identifier);
      expect(object.lexeme).to.equal('y');

      checkBody(stmt.body);
    }

    program.body.forEach(check);
  });
});
