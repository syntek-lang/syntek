import { $ } from '../../../../structures/rule';
import { TokenMatcher, EquationToken } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../Expression';

export class MdEquation extends EquationToken {
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

    let op;
    switch (this.operator.constructor) {
      case tokens.Star: op = '$mul'; break;
      case tokens.Slash: op = '$div'; break;
      case tokens.Modulo: op = '$mod'; break;
      default: throw new Error('Unknown operator token');
    }

    return `${left}.callMethod('${op}', [${right}])`;
  }
}

export const MdEquationMatcher = new TokenMatcher(MdEquation, $.SEQ(
  Expression,
  $.OR(
    tokens.Star,
    tokens.Slash,
    tokens.Modulo,
  ),
  Expression,
));
