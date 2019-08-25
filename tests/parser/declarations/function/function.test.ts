import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { FunctionDeclaration } from '../../../../src/grammar/nodes/Declarations';

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

describe('function', () => {
  it('parses generic param correctly', () => {
    const program = parse(loadRaw(__dirname, './generic-param.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('foo');

      expect(decl.genericParams.length).to.equal(1);
      expect(decl.genericParams[0].lexeme).to.equal('A');

      expect(decl.params.length).to.equal(0);
      expect(decl.returnType).to.be.null;

      checkBody(decl.body);
    }

    program.body.forEach(check);
  });

  describe('without returns', () => {
    it('parses without params', () => {
      const program = parse(loadRaw(__dirname, './without-returns/without-params.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);
        expect(decl.params.length).to.equal(0);
        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses single param without type', () => {
      const program = parse(loadRaw(__dirname, './without-returns/single-param-without-type.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(1);

        const param = decl.params[0];
        expect(param.name.lexeme).to.equal('x');
        expect(param.variableType).to.be.null;

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses single param with type, no array depth', () => {
      const program = parse(loadRaw(__dirname, './without-returns/single-param-with-type-no-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(1);

        const param = decl.params[0];
        expect(param.name.lexeme).to.equal('x');
        expect(param.variableType).to.not.be.null;
        expect((param.variableType!.type as Identifier).lexeme).to.equal('Number');
        expect(param.variableType!.generics.length).to.equal(0);
        expect(param.variableType!.arrayDepth).to.equal(0);

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses single param with type, single array depth', () => {
      const program = parse(loadRaw(__dirname, './without-returns/single-param-with-type-single-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(1);

        const param = decl.params[0];
        expect(param.name.lexeme).to.equal('x');
        expect(param.variableType).to.not.be.null;
        expect((param.variableType!.type as Identifier).lexeme).to.equal('Number');
        expect(param.variableType!.generics.length).to.equal(0);
        expect(param.variableType!.arrayDepth).to.equal(1);

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses single param with type, multi array depth', () => {
      const program = parse(loadRaw(__dirname, './without-returns/single-param-with-type-multi-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(1);

        const param = decl.params[0];
        expect(param.name.lexeme).to.equal('x');
        expect(param.variableType).to.not.be.null;
        expect((param.variableType!.type as Identifier).lexeme).to.equal('Number');
        expect(param.variableType!.generics.length).to.equal(0);
        expect(param.variableType!.arrayDepth).to.equal(2);

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses multi param without type', () => {
      const program = parse(loadRaw(__dirname, './without-returns/multi-param-without-type.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

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

    it('parses multi param with type, no array depth', () => {
      const program = parse(loadRaw(__dirname, './without-returns/multi-param-with-type-no-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(2);

        const firstParam = decl.params[0];
        expect(firstParam.name.lexeme).to.equal('x');
        expect(firstParam.variableType).to.not.be.null;
        expect((firstParam.variableType!.type as Identifier).lexeme).to.equal('Number');
        expect(firstParam.variableType!.generics.length).to.equal(0);
        expect(firstParam.variableType!.arrayDepth).to.equal(0);

        const secondParam = decl.params[1];
        expect(secondParam.name.lexeme).to.equal('y');
        expect(secondParam.variableType).to.not.be.null;
        expect((secondParam.variableType!.type as Identifier).lexeme).to.equal('String');
        expect(secondParam.variableType!.generics.length).to.equal(0);
        expect(secondParam.variableType!.arrayDepth).to.equal(0);

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses multi param with type, single array depth', () => {
      const program = parse(loadRaw(__dirname, './without-returns/multi-param-with-type-single-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(2);

        const firstParam = decl.params[0];
        expect(firstParam.name.lexeme).to.equal('x');
        expect(firstParam.variableType).to.not.be.null;
        expect((firstParam.variableType!.type as Identifier).lexeme).to.equal('Number');
        expect(firstParam.variableType!.generics.length).to.equal(0);
        expect(firstParam.variableType!.arrayDepth).to.equal(1);

        const secondParam = decl.params[1];
        expect(secondParam.name.lexeme).to.equal('y');
        expect(secondParam.variableType).to.not.be.null;
        expect((secondParam.variableType!.type as Identifier).lexeme).to.equal('String');
        expect(secondParam.variableType!.generics.length).to.equal(0);
        expect(secondParam.variableType!.arrayDepth).to.equal(1);

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses multi param with type, multi array depth', () => {
      const program = parse(loadRaw(__dirname, './without-returns/multi-param-with-type-multi-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(2);

        const firstParam = decl.params[0];
        expect(firstParam.name.lexeme).to.equal('x');
        expect(firstParam.variableType).to.not.be.null;
        expect((firstParam.variableType!.type as Identifier).lexeme).to.equal('Number');
        expect(firstParam.variableType!.generics.length).to.equal(0);
        expect(firstParam.variableType!.arrayDepth).to.equal(2);

        const secondParam = decl.params[1];
        expect(secondParam.name.lexeme).to.equal('y');
        expect(secondParam.variableType).to.not.be.null;
        expect((secondParam.variableType!.type as Identifier).lexeme).to.equal('String');
        expect(secondParam.variableType!.generics.length).to.equal(0);
        expect(secondParam.variableType!.arrayDepth).to.equal(2);

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses single generic param', () => {
      const program = parse(loadRaw(__dirname, './without-returns/single-generic-param.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);

        expect(decl.params.length).to.equal(1);

        const param = decl.params[0];
        expect(param.name.lexeme).to.equal('x');
        expect(param.variableType).to.not.be.null;
        expect((param.variableType!.type as Identifier).lexeme).to.equal('A');

        expect(param.variableType!.generics.length).to.equal(1);
        const generic = param.variableType!.generics[0];
        expect((generic.type as Identifier).lexeme).to.equal('B');
        expect(generic.generics.length).to.equal(0);
        expect(generic.arrayDepth).to.equal(0);

        expect(param.variableType!.arrayDepth).to.equal(0);

        expect(decl.returnType).to.be.null;

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });
  });

  describe('with returns', () => {
    it('parses without params, no array depth', () => {
      const program = parse(loadRaw(__dirname, './with-returns/no-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);
        expect(decl.params.length).to.equal(0);

        expect(decl.returnType).to.not.be.null;
        expect((decl.returnType!.type as Identifier).lexeme).to.equal('Boolean');
        expect(decl.returnType!.generics.length).to.equal(0);
        expect(decl.returnType!.arrayDepth).to.equal(0);

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses without params, single array depth', () => {
      const program = parse(loadRaw(__dirname, './with-returns/single-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);
        expect(decl.params.length).to.equal(0);

        expect(decl.returnType).to.not.be.null;
        expect((decl.returnType!.type as Identifier).lexeme).to.equal('Boolean');
        expect(decl.returnType!.generics.length).to.equal(0);
        expect(decl.returnType!.arrayDepth).to.equal(1);

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses without params, multi array depth', () => {
      const program = parse(loadRaw(__dirname, './with-returns/multi-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);
        expect(decl.params.length).to.equal(0);

        expect(decl.returnType).to.not.be.null;
        expect((decl.returnType!.type as Identifier).lexeme).to.equal('Boolean');
        expect(decl.returnType!.generics.length).to.equal(0);
        expect(decl.returnType!.arrayDepth).to.equal(2);

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });

    it('parses generic correctly', () => {
      const program = parse(loadRaw(__dirname, './with-returns/generic.tek'));

      function check(node: Node): void {
        const decl = node as FunctionDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
        expect(decl).to.be.an.instanceof(FunctionDeclaration);

        expect(decl.identifier.lexeme).to.equal('foo');
        expect(decl.genericParams.length).to.equal(0);
        expect(decl.params.length).to.equal(0);

        expect(decl.returnType).to.not.be.null;
        expect((decl.returnType!.type as Identifier).lexeme).to.equal('A');

        expect(decl.returnType!.generics.length).to.equal(1);
        const generic = decl.returnType!.generics[0];
        expect((generic.type as Identifier).lexeme).to.equal('B');
        expect(generic.generics.length).to.equal(0);
        expect(generic.arrayDepth).to.equal(0);

        expect(decl.returnType!.arrayDepth).to.equal(0);

        checkBody(decl.body);
      }

      program.body.forEach(check);
    });
  });
});
