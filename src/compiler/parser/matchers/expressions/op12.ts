import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Wrapped Expression

// Other: https://docs.syntek.dev/spec/grammar/syntactic/expressions/
// | Identifiers
// | Literals
// | Super
// | This

export function op12(this: ExpressionMatcher): Node {
  if (this.match(LexicalToken.LPAR)) {
    const start = this.previous().location.start;
    this.eatWhitespace();

    const expr = this.expression();
    this.eatWhitespace();

    this.consume(LexicalToken.RPAR, 'Expected ")" after expression.');

    const end = this.previous().location.end;
    return new Expressions.WrappedExpression(expr, { start, end });
  }

  if (this.match(LexicalToken.IDENTIFIER)) {
    return new Expressions.Identifier(this.previous(), this.previous().location);
  }

  if (this.match(
    LexicalToken.BOOLEAN,
    LexicalToken.NULL,
    LexicalToken.NUMBER,
    LexicalToken.STRING,
  )) {
    return new Expressions.Literal(this.previous(), this.previous().location);
  }

  if (this.match(LexicalToken.SUPER)) {
    return new Expressions.Super(this.previous().location);
  }

  if (this.match(LexicalToken.THIS)) {
    return new Expressions.This(this.previous().location);
  }

  // TODO: proper error handling
  throw new Error('Could not match an expression');
}
