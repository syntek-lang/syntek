import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

export class NotExpression extends Token {
  /**
   * The token `not` is being called on
   */
  readonly argument: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.argument = matchedTokens[1];
  }

  build(): string {
    const argument = this.argument instanceof tokens.Identifier ? `this.get('${this.argument.build()}')` : this.argument.build();
    return `${argument}.callMethod('$not', [])`;
  }
}

export const NotExpressionMatcher = new TokenMatcher(NotExpression, $.SEQ(
  tokens.Not,
  Expression,
));
