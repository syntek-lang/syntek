import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ImportDeclaration } from '../../../../src/grammar/nodes/Declarations';

describe('import', () => {
  describe('full', () => {
    it('parses full correctly', () => {
      const program = parse(loadRaw(__dirname, './full/full.tek'));

      function check(node: Node): void {
        const decl = node as ImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.IMPORT_DECL);
        expect(decl).to.be.an.instanceof(ImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.rename).to.be.undefined;
        expect(decl.expose).to.be.undefined;
      }

      program.body.forEach(check);
    });

    it('parses rename correctly', () => {
      const program = parse(loadRaw(__dirname, './full/rename.tek'));

      function check(node: Node): void {
        const decl = node as ImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.IMPORT_DECL);
        expect(decl).to.be.an.instanceof(ImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.rename!.lexeme).to.equal('c');
        expect(decl.expose).to.be.undefined;
      }

      program.body.forEach(check);
    });
  });

  describe('partial', () => {
    it('parses partial correctly', () => {
      const program = parse(loadRaw(__dirname, './partial/partial.tek'));

      function check(node: Node): void {
        const decl = node as ImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.IMPORT_DECL);
        expect(decl).to.be.an.instanceof(ImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.rename).to.be.undefined;
        expect(decl.expose!.length).to.equal(2);

        expect(decl.expose![0].value.lexeme).to.equal('c');
        expect(decl.expose![0].rename).to.be.undefined;

        expect(decl.expose![1].value.lexeme).to.equal('d');
        expect(decl.expose![1].rename).to.be.undefined;
      }

      program.body.forEach(check);
    });

    it('parses rename correctly', () => {
      const program = parse(loadRaw(__dirname, './partial/rename.tek'));

      function check(node: Node): void {
        const decl = node as ImportDeclaration;
        expect(decl.type).to.equal(SyntacticToken.IMPORT_DECL);
        expect(decl).to.be.an.instanceof(ImportDeclaration);

        expect(decl.path.length).to.equal(2);
        expect(decl.path[0].lexeme).to.equal('a');
        expect(decl.path[1].lexeme).to.equal('b');

        expect(decl.rename).to.be.undefined;
        expect(decl.expose!.length).to.equal(2);

        expect(decl.expose![0].value.lexeme).to.equal('c');
        expect(decl.expose![0].rename!.lexeme).to.equal('d');

        expect(decl.expose![1].value.lexeme).to.equal('e');
        expect(decl.expose![1].rename!.lexeme).to.equal('f');
      }

      program.body.forEach(check);
    });
  });
});
