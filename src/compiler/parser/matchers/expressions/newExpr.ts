import {
  Node, Token, LexicalToken, Expressions,
} from '../../..';

import { Precedence } from '../Precedence';
import { Parser } from '../../Parser';
import { Utils } from '../Utils';

export function newExpr(this: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  this.eatWhitespace();

  let object = this.parsePrecedence(Precedence.OP12);
  this.eatWhitespace();

  while (this.match(LexicalToken.DOT)) {
    const property = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier');

    object = new Expressions.MemberExpression(object, property, {
      start: object.location.start,
      end: property.location.end,
    });
  }

  this.eatWhitespace();
  this.consume(LexicalToken.LPAR, 'Expected "("');
  const params = Utils.matchExpressionList.call(this, LexicalToken.RPAR);

  return new Expressions.NewExpression(object, params, {
    start,
    end: this.previous().location.end,
  });
}
