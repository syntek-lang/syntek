import { $ } from '../../../../structures/rule';
import { TokenMatcher, EquationToken } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../Expression';

export class PowEquation extends EquationToken {
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
    const left = this.left instanceof tokens.Identifier ? `this.get('${this.left.build()}')` : this.left.build();
    const right = this.right instanceof tokens.Identifier ? `this.get('${this.right.build()}')` : this.right.build();

    return `${left}.callMethod('$pow', [${right}])`;
  }
}

export const PowEquationMatcher = new TokenMatcher(PowEquation, $.SEQ(
  Expression,
  tokens.Pow,
  Expression,
));
