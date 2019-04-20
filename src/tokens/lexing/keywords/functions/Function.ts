import { Token, TokenMatcher } from '../../../../structures/token';

export class Function extends Token {
  build(): string {
    return '';
  }
}

export const FunctionMatcher = new TokenMatcher(Function, /^function(?!\w)/);
