import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Node } from '../../../../src/grammar/Node';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { VariableDeclaration } from '../../../../src/grammar/nodes/Declarations';
import { Identifier, ConditionalExpression } from '../../../../src/grammar/nodes/Expressions';

describe('conditional', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './conditional.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.VARIABLE_DECL);
      expect(node).to.be.an.instanceof(VariableDeclaration);

      const expr = (node as VariableDeclaration).value as ConditionalExpression;

      expect(expr.type).to.equal(SyntacticToken.CONDITIONAL_EXPR);
      expect(expr).to.be.an.instanceof(ConditionalExpression);

      const condition = expr.condition as Identifier;
      expect(condition.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(condition).to.be.an.instanceof(Identifier);
      expect(condition.lexeme).to.equal('x');

      const whenTrue = expr.whenTrue as Identifier;
      expect(whenTrue.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(whenTrue).to.be.an.instanceof(Identifier);
      expect(whenTrue.lexeme).to.equal('y');

      const whenFalse = expr.whenFalse as Identifier;
      expect(whenFalse.type).to.equal(SyntacticToken.IDENTIFIER);
      expect(whenFalse).to.be.an.instanceof(Identifier);
      expect(whenFalse.lexeme).to.equal('z');
    }

    program.body.forEach(check);
  });
});
