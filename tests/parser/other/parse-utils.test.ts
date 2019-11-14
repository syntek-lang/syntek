import 'mocha';
import { expect } from 'chai';

import {
  matchVarLoc, matchGenericParams, matchGenericArgs, matchTypeDecl,
} from '../../../src/parser/parse-utils';
import { Tokenizer } from '../../../src/parser/Tokenizer';
import { Parser } from '../../../src/parser/Parser';

import { SyntacticToken } from '../../../src/grammar/SyntacticToken';
import { Identifier, MemberExpression } from '../../../src/grammar/nodes/Expressions';

describe('parse-utils', () => {
  describe('matchVarLoc', () => {
    it('matches single identifier', () => {
      const { tokens } = new Tokenizer('x').tokenize();
      const parser = new Parser(tokens);

      const varLoc = matchVarLoc(parser) as Identifier;

      expect(varLoc.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(varLoc).to.be.an.instanceOf(Identifier);
      expect(varLoc.lexeme).to.equal('x');
    });

    it('matches single prop correctly', () => {
      ['x.y', 'x\n.y', 'x.\ny', 'x\n.\ny'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        const varLoc = matchVarLoc(parser) as MemberExpression;

        expect(varLoc.type).to.equal(SyntacticToken.MEMBER_EXPR);
        expect(varLoc).to.be.an.instanceOf(MemberExpression);

        const object = varLoc.object as Identifier;
        expect(object.type).to.equal(SyntacticToken.IDENTIFIER);
        expect(object).to.be.an.instanceOf(Identifier);
        expect(object.lexeme).to.equal('x');

        expect(varLoc.property.lexeme).to.equal('y');
      });
    });

    it('matches multi prop correctly', () => {
      ['x.y.z', 'x\n.y.z', 'x.\ny.z', 'x.y\n.z', 'x.y.\nz', 'x\n.y\n.z', 'x.\ny.\nz', 'x\n.\ny\n.\nz'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        const varLoc = matchVarLoc(parser) as MemberExpression;

        expect(varLoc.type).to.equal(SyntacticToken.MEMBER_EXPR);
        expect(varLoc).to.be.an.instanceOf(MemberExpression);

        const firstObject = varLoc.object as MemberExpression;
        expect(firstObject.type).to.equal(SyntacticToken.MEMBER_EXPR);
        expect(firstObject).to.be.an.instanceOf(MemberExpression);
        expect(firstObject.property.lexeme).to.equal('y');

        const secondObject = firstObject.object as Identifier;
        expect(secondObject.type).to.equal(SyntacticToken.IDENTIFIER);
        expect(secondObject).to.be.an.instanceOf(Identifier);
        expect(secondObject.lexeme).to.equal('x');

        expect(varLoc.property.lexeme).to.equal('z');
      });
    });
  });

  describe('matchGenericParams', () => {
    it('matches single generic param correctly', () => {
      ['<T>', '<\nT>', '<T\n>', '<\nT\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        parser.advance(); // Skip <

        const genericParams = matchGenericParams(parser);

        expect(genericParams.length).to.equal(1);
        expect(genericParams[0].identifier.lexeme).to.equal('T');
        expect(genericParams[0].extend).to.be.undefined;
      });
    });

    it('matches multi generic param correctly', () => {
      ['<A, B>', '<\nA, B>', '<A\n, B>', '<A, \nB>', '<A, B\n>', '<\nA\n, \nB\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        parser.advance(); // Skip <

        const genericParams = matchGenericParams(parser);

        expect(genericParams.length).to.equal(2);

        expect(genericParams[0].identifier.lexeme).to.equal('A');
        expect(genericParams[0].extend).to.be.undefined;

        expect(genericParams[1].identifier.lexeme).to.equal('B');
        expect(genericParams[1].extend).to.be.undefined;
      });
    });

    it('matches extend correctly', () => {
      ['<A extends B>', '<\nA extends B>', '<A\n extends B>', '<A extends \nB>', '<A extends B\n>', '<\nA\n extends \nB\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        parser.advance(); // Skip <

        const genericParams = matchGenericParams(parser);

        expect(genericParams.length).to.equal(1);
        expect(genericParams[0].identifier.lexeme).to.equal('A');

        expect(genericParams[0].extend).to.not.be.undefined;
        expect((genericParams[0].extend!.object as Identifier).lexeme).to.equal('B');
        expect(genericParams[0].extend!.generics.length).to.equal(0);
        expect(genericParams[0].extend!.arrayDepth).to.equal(0);
      });
    });
  });

  describe('matchGenericArgs', () => {
    it('matches single arg correctly', () => {
      ['<T>', '<\nT>', '<T\n>', '<\nT\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        parser.advance(); // Skip <

        const genericArgs = matchGenericArgs(parser);

        expect(genericArgs.length).to.equal(1);
        expect((genericArgs[0].object as Identifier).lexeme).to.equal('T');
        expect(genericArgs[0].generics.length).to.equal(0);
        expect(genericArgs[0].arrayDepth).to.equal(0);
      });
    });

    it('matches multi arg correctly', () => {
      ['<A, B>', '<\nA, B>', '<A\n, B>', '<A, \nB>', '<A, B\n>', '<\nA\n, \nB\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        parser.advance(); // Skip <

        const genericArgs = matchGenericArgs(parser);

        expect(genericArgs.length).to.equal(2);

        expect((genericArgs[0].object as Identifier).lexeme).to.equal('A');
        expect(genericArgs[0].generics.length).to.equal(0);
        expect(genericArgs[0].arrayDepth).to.equal(0);

        expect((genericArgs[1].object as Identifier).lexeme).to.equal('B');
        expect(genericArgs[1].generics.length).to.equal(0);
        expect(genericArgs[1].arrayDepth).to.equal(0);
      });
    });

    it('matches member expr correctly', () => {
      ['<x.y>', '<\nx.y>', '<x.y\n>', '<x\n.y>', '<x.\ny>', '<\nx\n.\ny\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        parser.advance(); // Skip <

        const genericArgs = matchGenericArgs(parser);

        expect(genericArgs.length).to.equal(1);

        const expr = genericArgs[0].object as MemberExpression;
        expect((expr.object as Identifier).lexeme).to.equal('x');
        expect(expr.property.lexeme).to.equal('y');

        expect(genericArgs[0].generics.length).to.equal(0);
        expect(genericArgs[0].arrayDepth).to.equal(0);
      });
    });

    it('matches generic correctly', () => {
      ['<A<B>>', '<\nA<B>>', '<A\n<B>>', '<A<\nB>>', '<A<B\n>>', '<A<B>\n>', '<\nA\n<\nB\n>\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        parser.advance(); // Skip <

        const genericArgs = matchGenericArgs(parser);

        expect(genericArgs.length).to.equal(1);

        expect((genericArgs[0].object as Identifier).lexeme).to.equal('A');
        expect(genericArgs[0].generics.length).to.equal(1);

        const generic = genericArgs[0].generics[0];
        expect((generic.object as Identifier).lexeme).to.equal('B');
        expect(generic.generics.length).to.equal(0);
        expect(generic.arrayDepth).to.equal(0);

        expect(genericArgs[0].arrayDepth).to.equal(0);
      });
    });
  });

  describe('matchTypeDecl', () => {
    it('matches identifier correctly', () => {
      const { tokens } = new Tokenizer('x').tokenize();
      const parser = new Parser(tokens);

      const typeDecl = matchTypeDecl(parser);

      expect((typeDecl.object as Identifier).lexeme).to.equal('x');
      expect(typeDecl.generics.length).to.equal(0);
      expect(typeDecl.arrayDepth).to.equal(0);
    });

    it('matches member expr correctly', () => {
      ['x.y', 'x\n.y', 'x.\ny', 'x\n.\ny'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        const typeDecl = matchTypeDecl(parser);

        const expr = typeDecl.object as MemberExpression;
        expect((expr.object as Identifier).lexeme).to.equal('x');
        expect(expr.property.lexeme).to.equal('y');

        expect(typeDecl.generics.length).to.equal(0);
        expect(typeDecl.arrayDepth).to.equal(0);
      });
    });

    it('matches single array depth correctly', () => {
      ['x[]', 'x[\n]'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        const typeDecl = matchTypeDecl(parser);

        expect((typeDecl.object as Identifier).lexeme).to.equal('x');
        expect(typeDecl.generics.length).to.equal(0);
        expect(typeDecl.arrayDepth).to.equal(1);
      });
    });

    it('matches multi array depth correctly', () => {
      ['x[][]', 'x[\n][]', 'x[][\n]', 'x[\n][\n]'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        const typeDecl = matchTypeDecl(parser);

        expect((typeDecl.object as Identifier).lexeme).to.equal('x');
        expect(typeDecl.generics.length).to.equal(0);
        expect(typeDecl.arrayDepth).to.equal(2);
      });
    });

    it('matches generic correctly', () => {
      ['A<B>', 'A\n<B>', 'A<\nB>', 'A<B\n>', 'A\n<\nB\n>'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        const typeDecl = matchTypeDecl(parser);

        expect((typeDecl.object as Identifier).lexeme).to.equal('A');

        expect(typeDecl.generics.length).to.equal(1);
        expect((typeDecl.generics[0].object as Identifier).lexeme).to.equal('B');
        expect(typeDecl.generics[0].generics.length).to.equal(0);
        expect(typeDecl.generics[0].arrayDepth).to.equal(0);

        expect(typeDecl.arrayDepth).to.equal(0);
      });
    });

    it('matches generic with array depth correctly', () => {
      ['A<B>[]', 'A\n<B>[]', 'A<\nB>[]', 'A<B\n>[]', 'A\n<\nB\n>[]', 'A\n<\nB\n>[\n]'].forEach((input) => {
        const { tokens } = new Tokenizer(input).tokenize();
        const parser = new Parser(tokens);

        const typeDecl = matchTypeDecl(parser);

        expect((typeDecl.object as Identifier).lexeme).to.equal('A');

        expect(typeDecl.generics.length).to.equal(1);
        expect((typeDecl.generics[0].object as Identifier).lexeme).to.equal('B');
        expect(typeDecl.generics[0].generics.length).to.equal(0);
        expect(typeDecl.generics[0].arrayDepth).to.equal(0);

        expect(typeDecl.arrayDepth).to.equal(1);
      });
    });
  });

  describe('matchFunctionParams', () => {
    it('has to be tested');
  });
  describe('matchExpressionList', () => {
    it('has to be tested');
  });
});
