import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';
import { ClassDeclaration, VariableDeclaration, FunctionDeclaration } from '../../../../src/grammar/nodes/Declarations';

function checkIdentifier(node: Node, name: string): void {
  expect(node.type).to.equal(SyntacticToken.IDENTIFIER);
  expect(node).to.be.an.instanceof(Identifier);
  expect((node as Identifier).lexeme).to.equal(name);
}

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

describe('class', () => {
  it('parses single var correctly', () => {
    const program = parse(loadRaw(__dirname, './single-var.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);
      expect(decl.extends.length).to.equal(0);
      expect(decl.staticBody.length).to.equal(0);
      expect(decl.instanceBody.length).to.equal(1);

      const value = decl.instanceBody[0] as VariableDeclaration;
      expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(value).to.be.an.instanceof(VariableDeclaration);
      expect(value.variableType).to.be.null;
      expect(value.identifier.lexeme).to.equal('x');

      checkIdentifier(value.value, 'y');
    }

    program.body.forEach(check);
  });

  it('parses multi var correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-var.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);
      expect(decl.extends.length).to.equal(0);
      expect(decl.staticBody.length).to.equal(0);
      expect(decl.instanceBody.length).to.equal(2);

      const firstValue = decl.instanceBody[0] as VariableDeclaration;
      expect(firstValue.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(firstValue).to.be.an.instanceof(VariableDeclaration);
      expect(firstValue.variableType).to.be.null;
      expect(firstValue.identifier.lexeme).to.equal('x');

      checkIdentifier(firstValue.value, 'y');

      const secondValue = decl.instanceBody[1] as VariableDeclaration;
      expect(secondValue.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(secondValue).to.be.an.instanceof(VariableDeclaration);
      expect(secondValue.variableType).to.be.null;
      expect(secondValue.identifier.lexeme).to.equal('a');

      checkIdentifier(secondValue.value, 'b');
    }

    program.body.forEach(check);
  });

  it('parses single static var correctly', () => {
    const program = parse(loadRaw(__dirname, './single-static-var.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);
      expect(decl.extends.length).to.equal(0);
      expect(decl.staticBody.length).to.equal(1);
      expect(decl.instanceBody.length).to.equal(0);

      const value = decl.staticBody[0] as VariableDeclaration;
      expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(value).to.be.an.instanceof(VariableDeclaration);
      expect(value.variableType).to.be.null;
      expect(value.identifier.lexeme).to.equal('x');

      checkIdentifier(value.value, 'y');
    }

    program.body.forEach(check);
  });

  it('parses multi static var correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-static-var.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);
      expect(decl.extends.length).to.equal(0);
      expect(decl.staticBody.length).to.equal(2);
      expect(decl.instanceBody.length).to.equal(0);

      const firstValue = decl.staticBody[0] as VariableDeclaration;
      expect(firstValue.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(firstValue).to.be.an.instanceof(VariableDeclaration);
      expect(firstValue.variableType).to.be.null;
      expect(firstValue.identifier.lexeme).to.equal('x');

      checkIdentifier(firstValue.value, 'y');

      const secondValue = decl.staticBody[1] as VariableDeclaration;
      expect(secondValue.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(secondValue).to.be.an.instanceof(VariableDeclaration);
      expect(secondValue.variableType).to.be.null;
      expect(secondValue.identifier.lexeme).to.equal('a');

      checkIdentifier(secondValue.value, 'b');
    }

    program.body.forEach(check);
  });

  it('parses func correctly', () => {
    const program = parse(loadRaw(__dirname, './func.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);
      expect(decl.extends.length).to.equal(0);
      expect(decl.staticBody.length).to.equal(0);
      expect(decl.instanceBody.length).to.equal(1);

      const value = decl.instanceBody[0] as FunctionDeclaration;
      expect(value.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(value).to.be.an.instanceof(FunctionDeclaration);
      expect(value.identifier.lexeme).to.equal('x');
      expect(value.params.length).to.equal(0);
      expect(value.returnType).to.be.null;
      checkBody(value.body);
    }

    program.body.forEach(check);
  });

  it('parses static func correctly', () => {
    const program = parse(loadRaw(__dirname, './static-func.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);
      expect(decl.extends.length).to.equal(0);
      expect(decl.staticBody.length).to.equal(1);
      expect(decl.instanceBody.length).to.equal(0);

      const value = decl.staticBody[0] as FunctionDeclaration;
      expect(value.type).to.equal(SyntacticToken.FUNCTION_DECL);
      expect(value).to.be.an.instanceof(FunctionDeclaration);
      expect(value.identifier.lexeme).to.equal('x');
      expect(value.params.length).to.equal(0);
      expect(value.returnType).to.be.null;
      checkBody(value.body);
    }

    program.body.forEach(check);
  });

  it('parses single extend correctly', () => {
    const program = parse(loadRaw(__dirname, './single-extend.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);

      expect(decl.extends.length).to.equal(1);

      const extend = decl.extends[0];
      expect((extend.type as Identifier).lexeme).to.equal('Object');
      expect(extend.generics.length).to.equal(0);
      expect(extend.arrayDepth).to.equal(0);

      expect(decl.staticBody.length).to.equal(0);
      expect(decl.instanceBody.length).to.equal(1);

      const value = decl.instanceBody[0] as VariableDeclaration;
      expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(value).to.be.an.instanceof(VariableDeclaration);
      expect(value.variableType).to.be.null;
      expect(value.identifier.lexeme).to.equal('x');

      checkIdentifier(value.value, 'y');
    }

    program.body.forEach(check);
  });

  it('parses multi extend correctly', () => {
    const program = parse(loadRaw(__dirname, './multi-extend.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);

      expect(decl.extends.length).to.equal(2);

      const firstExtend = decl.extends[0];
      expect((firstExtend.type as Identifier).lexeme).to.equal('Object');
      expect(firstExtend.generics.length).to.equal(0);
      expect(firstExtend.arrayDepth).to.equal(0);

      const secondExtend = decl.extends[1];
      expect((secondExtend.type as Identifier).lexeme).to.equal('Other');
      expect(secondExtend.generics.length).to.equal(0);
      expect(secondExtend.arrayDepth).to.equal(0);

      expect(decl.staticBody.length).to.equal(0);
      expect(decl.instanceBody.length).to.equal(1);

      const value = decl.instanceBody[0] as VariableDeclaration;
      expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(value).to.be.an.instanceof(VariableDeclaration);
      expect(value.variableType).to.be.null;
      expect(value.identifier.lexeme).to.equal('x');

      checkIdentifier(value.value, 'y');
    }

    program.body.forEach(check);
  });

  it('parses generic class correctly', () => {
    const program = parse(loadRaw(__dirname, './generic-class.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(1);
      expect(decl.genericParams[0].lexeme).to.equal('T');

      expect(decl.extends.length).to.equal(0);

      expect(decl.staticBody.length).to.equal(0);
      expect(decl.instanceBody.length).to.equal(1);

      const value = decl.instanceBody[0] as VariableDeclaration;
      expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(value).to.be.an.instanceof(VariableDeclaration);
      expect(value.variableType).to.be.null;
      expect(value.identifier.lexeme).to.equal('x');

      checkIdentifier(value.value, 'y');
    }

    program.body.forEach(check);
  });

  it('parses generic extends correctly', () => {
    const program = parse(loadRaw(__dirname, './generic-extends.tek'));

    function check(node: Node): void {
      const decl = node as ClassDeclaration;
      expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
      expect(decl).to.be.an.instanceof(ClassDeclaration);
      expect(decl.identifier.lexeme).to.equal('MyClass');

      expect(decl.genericParams.length).to.equal(0);

      expect(decl.extends.length).to.equal(1);
      const extend = decl.extends[0];
      expect((extend.type as Identifier).lexeme).to.equal('A');

      expect(extend.generics.length).to.equal(1);
      const generic = extend.generics[0];
      expect((generic.type as Identifier).lexeme).to.equal('B');
      expect(generic.generics.length).to.equal(0);
      expect(generic.arrayDepth).to.equal(0);

      expect(extend.arrayDepth).to.equal(0);

      expect(decl.staticBody.length).to.equal(0);
      expect(decl.instanceBody.length).to.equal(1);

      const value = decl.instanceBody[0] as VariableDeclaration;
      expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(value).to.be.an.instanceof(VariableDeclaration);
      expect(value.variableType).to.be.null;
      expect(value.identifier.lexeme).to.equal('x');

      checkIdentifier(value.value, 'y');
    }

    program.body.forEach(check);
  });

  it('parses empty declarations correctly');
});
