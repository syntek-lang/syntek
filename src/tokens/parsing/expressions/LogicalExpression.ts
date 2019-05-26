import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

export class LogicalExpression extends Token {
  /**
   * The left hand side of the logical expression
   */
  readonly left: Token;

  /**
   * The operator of the logical expression
   */
  readonly operator: Token;

  /**
   * The right hand side of the logical expression
   */
  readonly right: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.left = matchedTokens[0];
    this.operator = matchedTokens[1];
    this.right = matchedTokens[2];
  }

  build(): string {
    let op: string;

    switch (this.operator.constructor) {
      case tokens.And: op = '$and'; break;
      case tokens.Or: op = '$or'; break;
      default: throw new Error('Unknown comparison token');
    }

    const left = this.left instanceof tokens.Identifier ? `this.get('${this.left.build()}')` : this.left.build();
    const right = this.right instanceof tokens.Identifier ? `this.get('${this.right.build()}')` : this.right.build();

    return `${left}.callMethod('${op}', [${right}])`;
  }
}

export const LogicalExpressionMatcher = new TokenMatcher(LogicalExpression, $.SEQ(
  Expression,
  $.OR(
    tokens.And,
    tokens.Or,
  ),
  Expression,
));
