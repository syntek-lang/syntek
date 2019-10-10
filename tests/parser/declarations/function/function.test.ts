import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { FunctionDeclaration, EmptyFunctionDeclaration } from '../../../../src/grammar/nodes/Declarations';

describe('function', () => {
  it('parses generic param correctly', () => {
    const program = parse(loadRaw(__dirname, './generic-param.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('x');

      expect(decl.genericParams.length).to.equal(1);
      expect(decl.genericParams[0].lexeme).to.equal('A');

      expect(decl.params.length).to.equal(0);
      expect(decl.returnType).to.be.null;
      expect(decl.body.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses without params correctly', () => {
    const program = parse(loadRaw(__dirname, './without-params.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('x');
      expect(decl.genericParams.length).to.equal(0);
      expect(decl.params.length).to.equal(0);
      expect(decl.returnType).to.be.null;
      expect(decl.body.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses param without type correctly', () => {
    const program = parse(loadRaw(__dirname, './param-without-type.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('x');
      expect(decl.genericParams.length).to.equal(0);

      expect(decl.params.length).to.equal(1);

      const param = decl.params[0];
      expect(param.name.lexeme).to.equal('y');
      expect(param.variableType).to.be.null;

      expect(decl.returnType).to.be.null;
      expect(decl.body.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses param with type correctly', () => {
    const program = parse(loadRaw(__dirname, './param-with-type.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('x');
      expect(decl.genericParams.length).to.equal(0);

      expect(decl.params.length).to.equal(1);

      const param = decl.params[0];
      expect(param.name.lexeme).to.equal('y');
      expect(param.variableType).to.not.be.null;
      expect((param.variableType!.object as Identifier).lexeme).to.equal('A');
      expect(param.variableType!.generics.length).to.equal(0);
      expect(param.variableType!.arrayDepth).to.equal(0);

      expect(decl.returnType).to.be.null;
      expect(decl.body.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses multiple param correctly', () => {
    const program = parse(loadRaw(__dirname, './multiple-param.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('x');
      expect(decl.genericParams.length).to.equal(0);

      expect(decl.params.length).to.equal(2);

      const param1 = decl.params[0];
      expect(param1.name.lexeme).to.equal('y');
      expect(param1.variableType).to.be.null;

      const param2 = decl.params[1];
      expect(param2.name.lexeme).to.equal('z');
      expect(param2.variableType).to.be.null;

      expect(decl.returnType).to.be.null;
      expect(decl.body.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses return correctly', () => {
    const program = parse(loadRaw(__dirname, './return.tek'));

    function check(node: Node): void {
      const decl = node as FunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(FunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('x');
      expect(decl.genericParams.length).to.equal(0);
      expect(decl.params.length).to.equal(0);

      expect(decl.returnType).to.not.be.null;
      expect((decl.returnType!.object as Identifier).lexeme).to.equal('A');
      expect(decl.returnType!.generics.length).to.equal(0);
      expect(decl.returnType!.arrayDepth).to.equal(0);
      expect(decl.body.length).to.equal(0);
    }

    program.body.forEach(check);
  });

  it('parses empty correctly', () => {
    const program = parse(loadRaw(__dirname, './empty.tek'));

    function check(node: Node): void {
      const decl = node as EmptyFunctionDeclaration;
      expect(decl.type).to.equal(SyntacticToken.EMPTY_FUNCTION_DECL);
      expect(decl).to.be.an.instanceof(EmptyFunctionDeclaration);

      expect(decl.identifier.lexeme).to.equal('x');
      expect(decl.genericParams.length).to.equal(0);
      expect(decl.params.length).to.equal(0);

      expect(decl.returnType).to.not.be.null;
      expect((decl.returnType!.object as Identifier).lexeme).to.equal('A');
      expect(decl.returnType!.generics.length).to.equal(0);
      expect(decl.returnType!.arrayDepth).to.equal(0);
    }

    program.body.forEach(check);
  });
});
