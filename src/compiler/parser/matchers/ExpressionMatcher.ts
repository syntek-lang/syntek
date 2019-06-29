import {
  Token, Node, LexicalToken, Expressions,
} from '../..';

import { Matcher } from './Matcher';

function isComparisonToken(token: Token): boolean {
  return token.type === LexicalToken.GREATER || token.type === LexicalToken.LESS;
}

export class ExpressionMatcher extends Matcher {
  expression(): Node {
    return this.equality();
  }

  private equality(): Node {
    let expr = this.comparison();

    while (this.peek().type === LexicalToken.IS && !isComparisonToken(this.peek(1))) {
      let operator = this.advance();

      if (this.peek().type === LexicalToken.NOT) {
        operator = this.advance();
      }

      const right = this.comparison();

      expr = new Expressions.BinaryExpression(expr, operator, right, {
        start: expr.location.start,
        end: right.location.end,
      });
    }

    return expr;
  }

  private comparison(): Node {
    let expr = this.addition();

    while (this.peek().type === LexicalToken.IS && isComparisonToken(this.peek(1))) {
      this.advance();

      const operator = this.advance();
      this.consume(LexicalToken.THAN, `Expected "than" after "${operator.lexeme}"`);
      const right = this.addition();

      expr = new Expressions.BinaryExpression(expr, operator, right, {
        start: expr.location.start,
        end: right.location.end,
      });
    }

    return expr;
  }

  private addition(): Node {
    let expr = this.multiplication();

    while (this.match(
      LexicalToken.PLUS,
      LexicalToken.MINUS,
    )) {
      const operator = this.previous();
      const right = this.multiplication();

      expr = new Expressions.BinaryExpression(expr, operator, right, {
        start: expr.location.start,
        end: right.location.end,
      });
    }

    return expr;
  }

  private multiplication(): Node {
    let expr = this.unary();

    while (this.match(
      LexicalToken.STAR,
      LexicalToken.SLASH,
      LexicalToken.CARET,
    )) {
      const operator = this.previous();
      const right = this.unary();

      expr = new Expressions.BinaryExpression(expr, operator, right, {
        start: expr.location.start,
        end: right.location.end,
      });
    }

    return expr;
  }

  private unary(): Node {
    if (this.match(
      LexicalToken.MINUS,
      LexicalToken.PLUS,
      LexicalToken.NOT,
    )) {
      const operator = this.previous();
      const right = this.unary();

      return new Expressions.UnaryExpression(operator, right, {
        start: operator.location.start,
        end: right.location.end,
      });
    }

    return this.primary();
  }

  private primary(): Node {
    if (this.match(
      LexicalToken.BOOLEAN,
      LexicalToken.NULL,
      LexicalToken.NUMBER,
      LexicalToken.STRING,
    )) {
      return new Expressions.LiteralExpression(this.previous(), this.previous().location);
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
}
