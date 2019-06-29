import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Member Expression
// | Index Expression
// | New Expression
// | Call Expression

function matchParamList(this: ExpressionMatcher): Node[] {
  const params: Node[] = [];

  this.eatWhitespace();

  while (!this.match(LexicalToken.RPAR)) {
    params.push(this.expression());
    this.eatWhitespace();

    if (this.peek().type !== LexicalToken.RPAR) {
      this.consume(LexicalToken.COMMA, 'Expected ","');
      this.eatWhitespace();
    }
  }

  return params;
}

export function op11(this: ExpressionMatcher): Node {
  let expr: Node;

  if (this.match(LexicalToken.NEW)) {
    // New Expression
    const start = this.previous().location.start;
    this.eatWhitespace();

    let object = this.op12();
    while (this.match(LexicalToken.DOT)) {
      const property = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier');

      object = new Expressions.MemberExpression(object, property, {
        start: object.location.start,
        end: property.location.end,
      });
    }

    this.eatWhitespace();
    this.consume(LexicalToken.LPAR, 'Expected "("');

    const params = matchParamList.call(this);

    expr = new Expressions.NewExpression(object, params, {
      start,
      end: this.previous().location.end,
    });
  } else {
    expr = this.op12();
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (this.peekIgnoreWhitespace().type === LexicalToken.DOT) {
      // Member Expression
      this.eatWhitespace();
      this.advance();

      this.eatWhitespace();
      const property = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier');

      expr = new Expressions.MemberExpression(expr, property, {
        start: expr.location.start,
        end: property.location.end,
      });
    } else if (this.match(LexicalToken.LSQB)) {
      // Index Expression
      this.eatWhitespace();

      const index = this.op12();
      this.eatWhitespace();
      this.consume(LexicalToken.RSQB, 'Expected "]"');

      expr = new Expressions.IndexExpression(expr, index, {
        start: expr.location.start,
        end: this.previous().location.end,
      });
    } else if (this.match(LexicalToken.LPAR)) {
      // Call Expression
      const params = matchParamList.call(this);

      expr = new Expressions.CallExpression(expr, params, {
        start: expr.location.start,
        end: this.previous().location.end,
      });
    } else {
      // Nothing was found
      break;
    }
  }

  return expr;
}
