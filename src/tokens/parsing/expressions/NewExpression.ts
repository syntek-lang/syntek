import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import { ExpressionStatement } from './ExpressionStatement';

export class NewExpression extends Token {
  /**
   * The token `new` is being called on
   */
  readonly callee: ExpressionStatement;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.callee = matchedTokens[1];
  }

  build(): string {
    const callee = `this.get('${this.callee.callee.build()}')`;
    const args = this.callee.buildArgs();

    return `${callee}.createNew([${args}])`;
  }
}

export const NewExpressionMatcher = new TokenMatcher(NewExpression, $.SEQ(
  tokens.New,
  ExpressionStatement,
));
