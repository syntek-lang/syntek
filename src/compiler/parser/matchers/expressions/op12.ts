import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Wrapped Expression

// Other: https://docs.syntek.dev/spec/grammar/syntactic/expressions/
// | Identifiers
// | Literals
// | Super
// | This
// | Array Expression
// | TODO: Object Expression

function matchArrayContent(this: ExpressionMatcher): Node[] {
  const content: Node[] = [];

  this.eatWhitespace();

  while (!this.match(LexicalToken.RSQB)) {
    content.push(this.expression());
    this.eatWhitespace();

    if (this.peek().type !== LexicalToken.RSQB) {
      this.consume(LexicalToken.COMMA, 'Expected ","');
      this.eatWhitespace();
    }
  }

  return content;
}

export function op12(this: ExpressionMatcher): Node {
  // Wrapped Expression
  if (this.match(LexicalToken.LPAR)) {
    const start = this.previous().location.start;
    this.eatWhitespace();

    const expr = this.expression();
    this.eatWhitespace();

    this.consume(LexicalToken.RPAR, 'Expected ")" after expression.');

    const end = this.previous().location.end;
    return new Expressions.WrappedExpression(expr, { start, end });
  }

  // Identifiers
  if (this.match(LexicalToken.IDENTIFIER)) {
    return new Expressions.Identifier(this.previous(), this.previous().location);
  }

  // Literals
  if (this.match(
    LexicalToken.BOOLEAN,
    LexicalToken.NULL,
    LexicalToken.NUMBER,
    LexicalToken.STRING,
  )) {
    return new Expressions.Literal(this.previous(), this.previous().location);
  }

  // Super
  if (this.match(LexicalToken.SUPER)) {
    return new Expressions.Super(this.previous().location);
  }

  // This
  if (this.match(LexicalToken.THIS)) {
    return new Expressions.This(this.previous().location);
  }

  // Array Expression
  if (this.match(LexicalToken.LSQB)) {
    const start = this.previous().location.start;

    const content = matchArrayContent.call(this);
    return new Expressions.ArrayExpression(content, {
      start,
      end: this.previous().location.end,
    });
  }

  // TODO: proper error handling
  throw new Error('Could not match an expression');
}
