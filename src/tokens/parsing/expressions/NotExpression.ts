import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class NotExpression extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(NotExpression, $.SEQ(
  tokens.Not,
  Expression,
));
