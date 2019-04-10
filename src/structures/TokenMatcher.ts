import Token from './Token';

type TokenClass = new (index: number, raw: string) => Token;

export default class TokenMatcher {
  readonly Class: TokenClass;

  readonly regex: RegExp;

  constructor(Class: TokenClass, regex: RegExp);

  constructor(Class: TokenClass, regex: RegExp) {
    this.Class = Class;
    this.regex = regex;
  }
}
