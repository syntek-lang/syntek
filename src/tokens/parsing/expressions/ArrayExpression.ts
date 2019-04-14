import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class ArrayExpression extends Token {
  readonly elements;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.elements = matchedTokens[1].filter((_, index) => index % 2 === 0);
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(ArrayExpression, $.SEQ(
  tokens.Lbra,
  $.MANY_SEP(
    Expression,
    tokens.Comma,
  ),
  tokens.Rbra,
));
