import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

export class ArrayExpression extends Token {
  /**
   * The elements of the array
   */
  readonly elements: Token[];

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.elements = matchedTokens[1].filter((_, index) => index % 2 === 0);
  }

  build(): string {
    const elements = this.elements.map(token => token.build()).join(',');
    return `new s.ArrayLiteral([${elements}])`;
  }
}

export const ArrayExpressionMatcher = new TokenMatcher(ArrayExpression, $.SEQ(
  tokens.Lbra,
  $.MANY_SEP(
    Expression,
    tokens.Comma,
  ),
  tokens.Rbra,
));
