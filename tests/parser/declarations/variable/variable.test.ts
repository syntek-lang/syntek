import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { Identifier } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { VariableDeclaration, EmptyVariableDeclaration } from '../../../../src/grammar/nodes/Declarations';

describe('variable', () => {
  describe('with value', () => {
    it('parses without type correctly', () => {
      const program = parse(loadRaw(__dirname, './without-type.tek'));

      function check(node: Node): void {
        const decl = node as VariableDeclaration;
        expect(decl.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(decl).to.be.an.instanceof(VariableDeclaration);

        expect(decl.identifier.lexeme).to.equal('x');
        expect(decl.variableType).to.be.null;

        const value = decl.value as Identifier;
        expect(value.type).to.equal(SyntacticToken.IDENTIFIER);
        expect(value).to.be.an.instanceof(Identifier);
        expect(value.lexeme).to.equal('y');
      }

      program.body.forEach(check);
    });

    it('parses with type, no array depth correctly', () => {
      const program = parse(loadRaw(__dirname, './with-type-no-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as VariableDeclaration;
        expect(decl.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(decl).to.be.an.instanceof(VariableDeclaration);

        expect(decl.identifier.lexeme).to.equal('x');

        expect(decl.variableType).to.not.be.null;
        expect((decl.variableType!.object as Identifier).lexeme).to.equal('Number');
        expect(decl.variableType!.generics.length).to.equal(0);
        expect(decl.variableType!.arrayDepth).to.equal(0);

        const value = decl.value as Identifier;
        expect(value.type).to.equal(SyntacticToken.IDENTIFIER);
        expect(value).to.be.an.instanceof(Identifier);
        expect(value.lexeme).to.equal('y');
      }

      program.body.forEach(check);
    });

    it('parses with type, single array depth correctly', () => {
      const program = parse(loadRaw(__dirname, './with-type-single-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as VariableDeclaration;
        expect(decl.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(decl).to.be.an.instanceof(VariableDeclaration);

        expect(decl.identifier.lexeme).to.equal('x');

        expect(decl.variableType).to.not.be.null;
        expect((decl.variableType!.object as Identifier).lexeme).to.equal('Number');
        expect(decl.variableType!.generics.length).to.equal(0);
        expect(decl.variableType!.arrayDepth).to.equal(1);

        const value = decl.value as Identifier;
        expect(value.type).to.equal(SyntacticToken.IDENTIFIER);
        expect(value).to.be.an.instanceof(Identifier);
        expect(value.lexeme).to.equal('y');
      }

      program.body.forEach(check);
    });

    it('parses with type, multi array depth correctly', () => {
      const program = parse(loadRaw(__dirname, './with-type-multi-array-depth.tek'));

      function check(node: Node): void {
        const decl = node as VariableDeclaration;
        expect(decl.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(decl).to.be.an.instanceof(VariableDeclaration);

        expect(decl.identifier.lexeme).to.equal('x');

        expect(decl.variableType).to.not.be.null;
        expect((decl.variableType!.object as Identifier).lexeme).to.equal('Number');
        expect(decl.variableType!.generics.length).to.equal(0);
        expect(decl.variableType!.arrayDepth).to.equal(2);

        const value = decl.value as Identifier;
        expect(value.type).to.equal(SyntacticToken.IDENTIFIER);
        expect(value).to.be.an.instanceof(Identifier);
        expect(value.lexeme).to.equal('y');
      }

      program.body.forEach(check);
    });

    it('parses generic correctly', () => {
      const program = parse(loadRaw(__dirname, './generic.tek'));

      function check(node: Node): void {
        const decl = node as VariableDeclaration;
        expect(decl.type).to.equal(SyntacticToken.VARIABLE_DECL);
        expect(decl).to.be.an.instanceof(VariableDeclaration);

        expect(decl.identifier.lexeme).to.equal('x');

        expect(decl.variableType).to.not.be.null;
        expect((decl.variableType!.object as Identifier).lexeme).to.equal('A');

        expect(decl.variableType!.generics.length).to.equal(1);
        const generic = decl.variableType!.generics[0];
        expect((generic.object as Identifier).lexeme).to.equal('B');
        expect(generic.generics.length).to.equal(0);
        expect(generic.arrayDepth).to.equal(0);

        expect(decl.variableType!.arrayDepth).to.equal(0);

        const value = decl.value as Identifier;
        expect(value.type).to.equal(SyntacticToken.IDENTIFIER);
        expect(value).to.be.an.instanceof(Identifier);
        expect(value.lexeme).to.equal('y');
      }

      program.body.forEach(check);
    });
  });

  describe('without value', () => {
    it('parses without type correctly', () => {
      const program = parse(loadRaw(__dirname, './empty-without-type.tek'));

      function check(node: Node): void {
        const decl = node as EmptyVariableDeclaration;
        expect(decl.type).to.equal(SyntacticToken.EMPTY_VARIABLE_DECL);
        expect(decl).to.be.an.instanceof(EmptyVariableDeclaration);

        expect(decl.identifier.lexeme).to.equal('x');
        expect(decl.variableType).to.be.null;
      }

      program.body.forEach(check);
    });

    it('parses with type correctly', () => {
      const program = parse(loadRaw(__dirname, './empty-with-type.tek'));

      function check(node: Node): void {
        const decl = node as EmptyVariableDeclaration;
        expect(decl.type).to.equal(SyntacticToken.EMPTY_VARIABLE_DECL);
        expect(decl).to.be.an.instanceof(EmptyVariableDeclaration);

        expect(decl.identifier.lexeme).to.equal('x');

        expect(decl.variableType).to.not.be.null;
        expect((decl.variableType!.object as Identifier).lexeme).to.equal('Number');
        expect(decl.variableType!.generics.length).to.equal(0);
        expect(decl.variableType!.arrayDepth).to.equal(0);
      }

      program.body.forEach(check);
    });
  });
});
