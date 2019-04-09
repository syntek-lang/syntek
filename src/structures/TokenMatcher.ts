import Token from './Token';

type TokenClass = new (index: number, raw: string) => Token;

export default class TokenMatcher {
  readonly Class?: TokenClass;

  readonly regex: RegExp;

  constructor(regex: RegExp);

  constructor(Class: TokenClass, regex: RegExp);

  constructor(Class: TokenClass | RegExp, regex?: RegExp) {
    if (regex) {
      this.Class = Class as TokenClass;
      this.regex = regex;
    } else {
      this.regex = Class as RegExp;
    }
  }
}
