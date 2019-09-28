import 'mocha';
import { expect } from 'chai';

import { parse, loadRaw } from '../../../test-utils';

import { Literal } from '../../../../src/grammar/nodes/Expressions';
import { SyntacticToken } from '../../../../src/grammar/SyntacticToken';
import { ExpressionStatement } from '../../../../src/grammar/nodes/Statements';

describe('string', () => {
  it('parses single quote correctly', () => {
    const valid = loadRaw(__dirname, './single-quote.tek');
    const strings = valid.split('\n');

    parse(valid).body.forEach((node, i) => {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as Literal;
      expect(expr.type).to.equal(SyntacticToken.LITERAL);
      expect(expr).to.be.an.instanceof(Literal);
      expect(expr.value.lexeme).to.equal(strings[i]);
    });
  });

  it('parses double quote correctly', () => {
    const valid = loadRaw(__dirname, './double-quote.tek');
    const strings = valid.split('\n');

    parse(valid).body.forEach((node, i) => {
      expect(node.type).to.equal(SyntacticToken.EXPRESSION_STMT);
      expect(node).to.be.an.instanceof(ExpressionStatement);

      const expr = (node as ExpressionStatement).expression as Literal;
      expect(expr.type).to.equal(SyntacticToken.LITERAL);
      expect(expr).to.be.an.instanceof(Literal);
      expect(expr.value.lexeme).to.equal(strings[i]);
    });
  });
});
