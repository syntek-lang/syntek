import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { Identifier } from '../../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { FunctionDeclaration } from '../../../../../src/grammar/nodes/Declarations';

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

describe('function', () => {
  // without returns
  it('parses without params, without returns correctly', () => {
    const program = parse(loadRaw(__dirname, './without-params-without-return.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('foo');
      expect(decl.params.length).to.equal(0);
      expect(decl.returnType).to.be.null;

      checkBody(decl.body);
    }

    program.body.forEach(check);
  });

  it('parses single param without type, without returns correctly', () => {
    const program = parse(loadRaw(__dirname, './single-param-without-type-without-return.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('foo');

      expect(decl.params.length).to.equal(1);

      const param = decl.params[0];
      expect(param.name.lexeme).to.equal('x');
      expect(param.variableType).to.be.null;

      expect(decl.returnType).to.be.null;

      checkBody(decl.body);
    }

    program.body.forEach(check);
  });

  it('parses single param with type, without returns correctly');

  it('parses multi param without type, without returns correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-param-without-type-without-return.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('foo');

      expect(decl.params.length).to.equal(2);

      const firstParam = decl.params[0];
      expect(firstParam.name.lexeme).to.equal('x');
      expect(firstParam.variableType).to.be.null;

      const secondParam = decl.params[1];
      expect(secondParam.name.lexeme).to.equal('y');
      expect(secondParam.variableType).to.be.null;

      expect(decl.returnType).to.be.null;

      checkBody(decl.body);
    }

    program.body.forEach(check);
  });

  it('parses multi param with type, without returns correctly');

  // with returns
  it('parses without params, with returns correctly');

  it('parses single param without type, with returns correctly');

  it('parses single param with type, with returns correctly');

  it('parses multi param without type, with returns correctly');

  it('parses multi param with type, with returns correctly');
});
