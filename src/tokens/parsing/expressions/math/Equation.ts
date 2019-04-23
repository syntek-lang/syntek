import { $ } from '../../../../structures/rule';
import { TokenMatcher, EquationToken } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../Expression';

export class Equation extends EquationToken {
  constructor(location, matchedTokens) {
    super(
      matchedTokens[0],
      matchedTokens[1],
      matchedTokens[2],
      location,
      matchedTokens,
    );
  }

  build(): string {
    return '';
  }
}

export const EquationMatcher = new TokenMatcher(Equation, $.SEQ(
  Expression,
  $.OR(
    tokens.Plus,
    tokens.Minus,
  ),
  Expression,
));
