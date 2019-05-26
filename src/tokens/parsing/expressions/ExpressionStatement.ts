import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';
import { MemberExpression } from './MemberExpression';

export class ExpressionStatement extends Token {
  /**
   * The type of the expression. Either `function` for function calls, or `array`
   * for accessing array elements.
   */
  readonly type: 'function' | 'array';

  /**
   * The variable that is being called
   */
  readonly callee: Token;

  /**
   * The arguments of the expression.
   */
  readonly arguments: Token[];

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.type = matchedTokens[1][0] instanceof tokens.Lpar ? 'function' : 'array';

    this.callee = matchedTokens[0];
    if (this.type === 'function') {
      if (matchedTokens[1].length <= 2) {
        this.arguments = [];
      } else {
        this.arguments = matchedTokens[1].filter((_, index) => index % 2 !== 0);
      }
    } else {
      this.arguments = [matchedTokens[1][1]];
    }
  }

  build(): string {
    const args = this.buildArgs();

    if (this.callee instanceof MemberExpression) {
      return `${this.callee.buildObject()}.callMethod('${this.callee.property.build()}', [${args}])`;
    }

    return `this.get('${this.callee.build()}').exec([${args}])`;
  }

  buildArgs(): string {
    return this.arguments.map((arg) => {
      switch (arg.constructor) {
        case tokens.Identifier:
          return `this.get('${arg.build()}')`;
        default:
          return arg.build();
      }
    }).join(',');
  }
}

export const ExpressionStatementMatcher = new TokenMatcher(ExpressionStatement, $.SEQ(
  $.OR(
    tokens.Identifier,
    MemberExpression,
  ),

  $.OR(
    // Function calls can contain logic, so it needs to be recursively parsed
    $.WRAPPED(
      tokens.Lpar,
      $.MANY_SEP(
        Expression,
        tokens.Comma,
      ),
      tokens.Rpar,
    ),

    // Array entry
    $.WRAPPED(
      tokens.Lbra,
      Expression,
      tokens.Rbra,
    ),
  ),
));
