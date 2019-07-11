import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../../test-utils';

import { Node } from '../../../../../src/grammar/Node';
import { LexicalToken } from '../../../../../src/grammar/LexicalToken';
import { SyntacticToken } from '../../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../../src/grammar/nodes/Statements';
import { Literal, MemberExpression } from '../../../../../src/grammar/nodes/Expressions';

describe('member', () => {
  it('parses correctly', () => {
    const program = parse(loadRaw(__dirname, './member.tek'));

    function check(node: Node): void {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as MemberExpression;

      expect(expr.type).to.equal(SyntacticToken.MEMBER_EXPR);
      expect(expr).to.be.an.instanceof(MemberExpression);

      const object = expr.object as Literal;
      expect(object.type).to.equal(SyntacticToken.LITERAL);
      expect(object).to.be.an.instanceof(Literal);
      expect(object.value.lexeme).to.equal('obj');

      const property = expr.property;
      expect(property.type).to.equal(LexicalToken.IDENTIFIER);
      expect(property.lexeme).to.equal('value');
    }

    program.body.forEach(check);
  });
});
