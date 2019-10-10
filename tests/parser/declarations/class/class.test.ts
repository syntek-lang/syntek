import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import {
  ClassDeclaration,
  VariableDeclaration, EmptyVariableDeclaration,
  FunctionDeclaration, EmptyFunctionDeclaration,
} from '../../../../src/grammar/nodes/Declarations';

function checkIdentifier(node: Node, name: string): void {
  expect(node.type).to.equal(SyntacticToken.IDENTIFIER);
  expect(node).to.be.an.instanceof(Identifier);
  expect((node as Identifier).lexeme).to.equal(name);
}

describe('class', () => {
  describe('regular', () => {
    it('parses empty class correctly', () => {
      const program = parse(loadRaw(__dirname, './empty.tek'));

      function check(node: Node): void {
        const decl = node as ClassDeclaration;
        expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
        expect(decl).to.be.an.instanceof(ClassDeclaration);
        expect(decl.abstract).to.be.false;
        expect(decl.identifier.lexeme).to.equal('A');

        expect(decl.genericParams.length).to.equal(0);
        expect(decl.extends.length).to.equal(0);
        expect(decl.body.length).to.equal(0);
      }

      program.body.forEach(check);
    });

    describe('var', () => {
      it('parses var correctly', () => {
        const program = parse(loadRaw(__dirname, './var/var.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(0);
          expect(decl.extends.length).to.equal(0);
          expect(decl.body.length).to.equal(1);

          const prop = decl.body[0];
          expect(prop.abstract).to.be.false;
          expect(prop.static).to.be.false;

          const value = prop.value as VariableDeclaration;
          expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
          expect(value).to.be.an.instanceof(VariableDeclaration);
          expect(value.variableType).to.be.null;
          expect(value.identifier.lexeme).to.equal('x');

          checkIdentifier(value.value, 'y');
        }

        program.body.forEach(check);
      });

      it('parses static var correctly', () => {
        const program = parse(loadRaw(__dirname, './var/static-var.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(0);
          expect(decl.extends.length).to.equal(0);
          expect(decl.body.length).to.equal(1);

          const prop = decl.body[0];
          expect(prop.abstract).to.be.false;
          expect(prop.static).to.be.true;

          const value = prop.value as VariableDeclaration;
          expect(value.type).to.equal(SyntacticToken.VARIABLE_DECL);
          expect(value).to.be.an.instanceof(VariableDeclaration);
          expect(value.variableType).to.be.null;
          expect(value.identifier.lexeme).to.equal('x');

          checkIdentifier(value.value, 'y');
        }

        program.body.forEach(check);
      });
    });

    describe('func', () => {
      it('parses func correctly', () => {
        const program = parse(loadRaw(__dirname, './func/func.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(0);
          expect(decl.extends.length).to.equal(0);
          expect(decl.body.length).to.equal(1);

          const prop = decl.body[0];
          expect(prop.abstract).to.be.false;
          expect(prop.static).to.be.false;

          const value = prop.value as FunctionDeclaration;
          expect(value.type).to.equal(SyntacticToken.FUNCTION_DECL);
          expect(value).to.be.an.instanceof(FunctionDeclaration);
          expect(value.identifier.lexeme).to.equal('x');
          expect(value.params.length).to.equal(0);
          expect(value.returnType).to.be.null;
          expect(value.body.length).to.equal(0);
        }

        program.body.forEach(check);
      });

      it('parses static func correctly', () => {
        const program = parse(loadRaw(__dirname, './func/static-func.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(0);
          expect(decl.extends.length).to.equal(0);
          expect(decl.body.length).to.equal(1);

          const prop = decl.body[0];
          expect(prop.abstract).to.be.false;
          expect(prop.static).to.be.true;

          const value = prop.value as FunctionDeclaration;
          expect(value.type).to.equal(SyntacticToken.FUNCTION_DECL);
          expect(value).to.be.an.instanceof(FunctionDeclaration);
          expect(value.identifier.lexeme).to.equal('x');
          expect(value.params.length).to.equal(0);
          expect(value.returnType).to.be.null;
          expect(value.body.length).to.equal(0);
        }

        program.body.forEach(check);
      });
    });

    describe('extend', () => {
      it('parses single extend correctly', () => {
        const program = parse(loadRaw(__dirname, './extend/single-extend.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(0);

          expect(decl.extends.length).to.equal(1);

          const extend = decl.extends[0];
          expect((extend.object as Identifier).lexeme).to.equal('B');
          expect(extend.generics.length).to.equal(0);
          expect(extend.arrayDepth).to.equal(0);

          expect(decl.body.length).to.equal(0);
        }

        program.body.forEach(check);
      });

      it('parses multi extend correctly', () => {
        const program = parse(loadRaw(__dirname, './extend/multi-extend.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(0);

          expect(decl.extends.length).to.equal(2);

          const firstExtend = decl.extends[0];
          expect((firstExtend.object as Identifier).lexeme).to.equal('B');
          expect(firstExtend.generics.length).to.equal(0);
          expect(firstExtend.arrayDepth).to.equal(0);

          const secondExtend = decl.extends[1];
          expect((secondExtend.object as Identifier).lexeme).to.equal('C');
          expect(secondExtend.generics.length).to.equal(0);
          expect(secondExtend.arrayDepth).to.equal(0);

          expect(decl.body.length).to.equal(0);
        }

        program.body.forEach(check);
      });
    });

    describe('generic', () => {
      it('parses generic class correctly', () => {
        const program = parse(loadRaw(__dirname, './generic/generic-class.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(1);
          expect(decl.genericParams[0].lexeme).to.equal('B');

          expect(decl.extends.length).to.equal(0);

          expect(decl.body.length).to.equal(0);
        }

        program.body.forEach(check);
      });

      it('parses generic extends correctly', () => {
        const program = parse(loadRaw(__dirname, './generic/generic-extends.tek'));

        function check(node: Node): void {
          const decl = node as ClassDeclaration;
          expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
          expect(decl).to.be.an.instanceof(ClassDeclaration);
          expect(decl.abstract).to.be.false;
          expect(decl.identifier.lexeme).to.equal('A');

          expect(decl.genericParams.length).to.equal(0);

          expect(decl.extends.length).to.equal(1);
          const extend = decl.extends[0];
          expect((extend.object as Identifier).lexeme).to.equal('B');

          expect(extend.generics.length).to.equal(1);
          const generic = extend.generics[0];
          expect((generic.object as Identifier).lexeme).to.equal('C');
          expect(generic.generics.length).to.equal(0);
          expect(generic.arrayDepth).to.equal(0);

          expect(extend.arrayDepth).to.equal(0);

          expect(decl.body.length).to.equal(0);
        }

        program.body.forEach(check);
      });
    });
  });

  describe('abstract', () => {
    it('parses empty class correctly', () => {
      const program = parse(loadRaw(__dirname, './abstract/empty.tek'));

      function check(node: Node): void {
        const decl = node as ClassDeclaration;
        expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
        expect(decl).to.be.an.instanceof(ClassDeclaration);
        expect(decl.abstract).to.be.true;
        expect(decl.identifier.lexeme).to.equal('A');

        expect(decl.genericParams.length).to.equal(0);
        expect(decl.extends.length).to.equal(0);
        expect(decl.body.length).to.equal(0);
      }

      program.body.forEach(check);
    });

    it('parses var correctly', () => {
      const program = parse(loadRaw(__dirname, './abstract/var.tek'));

      function check(node: Node): void {
        const decl = node as ClassDeclaration;
        expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
        expect(decl).to.be.an.instanceof(ClassDeclaration);
        expect(decl.abstract).to.be.true;
        expect(decl.identifier.lexeme).to.equal('A');

        expect(decl.genericParams.length).to.equal(0);
        expect(decl.extends.length).to.equal(0);
        expect(decl.body.length).to.equal(1);

        const prop = decl.body[0];
        expect(prop.abstract).to.be.true;
        expect(prop.static).to.be.false;

        const value = prop.value as EmptyVariableDeclaration;
        expect(value.type).to.equal(SyntacticToken.EMPTY_VARIABLE_DECL);
        expect(value).to.be.an.instanceof(EmptyVariableDeclaration);
        expect(value.variableType).to.be.null;
        expect(value.identifier.lexeme).to.equal('x');
      }

      program.body.forEach(check);
    });

    it('parses func correctly', () => {
      const program = parse(loadRaw(__dirname, './abstract/func.tek'));

      function check(node: Node): void {
        const decl = node as ClassDeclaration;
        expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
        expect(decl).to.be.an.instanceof(ClassDeclaration);
        expect(decl.abstract).to.be.true;
        expect(decl.identifier.lexeme).to.equal('A');

        expect(decl.genericParams.length).to.equal(0);
        expect(decl.extends.length).to.equal(0);
        expect(decl.body.length).to.equal(1);

        const prop = decl.body[0];
        expect(prop.abstract).to.be.true;
        expect(prop.static).to.be.false;

        const value = prop.value as EmptyFunctionDeclaration;
        expect(value.type).to.equal(SyntacticToken.EMPTY_FUNCTION_DECL);
        expect(value).to.be.an.instanceof(EmptyFunctionDeclaration);
        expect(value.identifier.lexeme).to.equal('x');
        expect(value.params.length).to.equal(0);
        expect(value.returnType).to.be.null;
      }

      program.body.forEach(check);
    });

    it('parses static correctly', () => {
      const program = parse(loadRaw(__dirname, './abstract/static.tek'));

      function check(node: Node): void {
        const decl = node as ClassDeclaration;
        expect(decl.type).to.equal(SyntacticToken.CLASS_DECL);
        expect(decl).to.be.an.instanceof(ClassDeclaration);
        expect(decl.abstract).to.be.true;
        expect(decl.identifier.lexeme).to.equal('A');

        expect(decl.genericParams.length).to.equal(0);
        expect(decl.extends.length).to.equal(0);
        expect(decl.body.length).to.equal(1);

        const prop = decl.body[0];
        expect(prop.abstract).to.be.true;
        expect(prop.static).to.be.true;

        const value = prop.value as EmptyVariableDeclaration;
        expect(value.type).to.equal(SyntacticToken.EMPTY_VARIABLE_DECL);
        expect(value).to.be.an.instanceof(EmptyVariableDeclaration);
        expect(value.variableType).to.be.null;
        expect(value.identifier.lexeme).to.equal('x');
      }

      program.body.forEach(check);
    });
  });
});
