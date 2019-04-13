import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';

class VariableDeclaration extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(VariableDeclaration, $.SEQ(
  tokens.Symbol,
  tokens.Equal,
  Expression,
));
