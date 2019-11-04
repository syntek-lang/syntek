import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { FullImportDeclaration, PartialImportDeclaration } from '../../../../src/grammar/nodes/Declarations';

describe('import', () => {
  describe('full', () => {
    it('parses full correctly', () => {
      const program = parse(loadRaw(__dirname, './full/full.tek'));

      function check(node: Node): void {
        const decl = node as FullImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FULL_IMPORT_DECL);
        expect(decl).to.be.an.instanceof(FullImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.identifier.lexeme).to.equal('b');
      }

      program.body.forEach(check);
    });

    it('parses rename correctly', () => {
      const program = parse(loadRaw(__dirname, './full/rename.tek'));

      function check(node: Node): void {
        const decl = node as FullImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.FULL_IMPORT_DECL);
        expect(decl).to.be.an.instanceof(FullImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.identifier.lexeme).to.equal('c');
      }

      program.body.forEach(check);
    });
  });

  describe('partial', () => {
    it('parses partial correctly', () => {
      const program = parse(loadRaw(__dirname, './partial/partial.tek'));

      function check(node: Node): void {
        const decl = node as PartialImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.PARTIAL_IMPORT_DECL);
        expect(decl).to.be.an.instanceof(PartialImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.expose.length).to.equal(2);

        expect(decl.expose[0].value.lexeme).to.equal('c');
        expect(decl.expose[0].identifier.lexeme).to.equal('c');

        expect(decl.expose[1].value.lexeme).to.equal('d');
        expect(decl.expose[1].identifier.lexeme).to.equal('d');
      }

      program.body.forEach(check);
    });

    it('parses rename correctly', () => {
      const program = parse(loadRaw(__dirname, './partial/rename.tek'));

      function check(node: Node): void {
        const decl = node as PartialImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.PARTIAL_IMPORT_DECL);
        expect(decl).to.be.an.instanceof(PartialImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.expose.length).to.equal(2);

        expect(decl.expose[0].value.lexeme).to.equal('c');
        expect(decl.expose[0].identifier.lexeme).to.equal('d');

        expect(decl.expose[1].value.lexeme).to.equal('e');
        expect(decl.expose[1].identifier.lexeme).to.equal('f');
      }

      program.body.forEach(check);
    });
  });
});
