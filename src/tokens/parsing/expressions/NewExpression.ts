import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import ExpressionStatement from './ExpressionStatement';

class NewExpression extends Token {
  readonly callee;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.callee = matchedTokens[1];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(NewExpression, $.SEQ(
  tokens.New,
  ExpressionStatement,
));
