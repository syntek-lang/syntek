import { Node, LexicalToken, Expressions } from '../..';

import { Matcher } from './Matcher';

export class ExpressionMatcher extends Matcher {
  primary(): Node {
    if (this.match(LexicalToken.BOOLEAN)) {
      return new Expressions.LiteralExpression(this.previous().lexeme === 'true', this.previous().location);
    }

    if (this.match(LexicalToken.NULL)) {
      return new Expressions.LiteralExpression(null, this.previous().location);
    }

    if (this.match(LexicalToken.NUMBER)) {
      return new Expressions.LiteralExpression(
        Number(this.previous().lexeme),
        this.previous().location,
      );
    }

    if (this.match(LexicalToken.STRING)) {
      return new Expressions.LiteralExpression(this.previous().lexeme, this.previous().location);
    }

    if (this.match(LexicalToken.LPAR)) {
      const start = this.previous().location.start;

      const expr = this.expression();
      this.consume(LexicalToken.RPAR, 'Expected ")" after expression.');

      const end = this.previous().location.end;
      return new Expressions.WrappedExpression(expr, { start, end });
    }

    // TODO: proper error handling
    throw new Error('Could not match an expression');
  }

  expression(): Node {
    return this.primary();
  }
}
