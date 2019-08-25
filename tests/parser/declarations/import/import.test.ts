import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ImportDeclaration } from '../../../../src/grammar/nodes/Declarations';

describe('import', () => {
  it('parses builtin correctly', () => {
    const program = parse(loadRaw(__dirname, './builtin.tek'));

    function check(node: Node): void {
      const decl = node as ImportDeclaration;
      expect(decl.type).to.equal(SyntacticToken.IMPORT_DECL);
      expect(decl).to.be.an.instanceof(ImportDeclaration);

      expect(decl.source.lexeme).to.equal('foo');
      expect(decl.identifier.lexeme).to.equal('foo');
    }

    program.body.forEach(check);
  });

  it('parses builtin with "as" correctly', () => {
    const program = parse(loadRaw(__dirname, './builtin-with-as.tek'));

    function check(node: Node): void {
      const decl = node as ImportDeclaration;
      expect(decl.type).to.equal(SyntacticToken.IMPORT_DECL);
      expect(decl).to.be.an.instanceof(ImportDeclaration);

      expect(decl.source.lexeme).to.equal('foo');
      expect(decl.identifier.lexeme).to.equal('bar');
    }

    program.body.forEach(check);
  });

  it('parses external correctly', () => {
    const program = parse(loadRaw(__dirname, './external.tek'));

    function check(node: Node): void {
      const decl = node as ImportDeclaration;
      expect(decl.type).to.equal(SyntacticToken.IMPORT_DECL);
      expect(decl).to.be.an.instanceof(ImportDeclaration);

      expect(decl.source.lexeme).to.equal("'./foo'");
      expect(decl.identifier.lexeme).to.equal('bar');
    }

    program.body.forEach(check);
  });
});
