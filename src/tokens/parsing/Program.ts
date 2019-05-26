import { Token } from '../../structures/token';

export default class Program extends Token {
  /**
   * The body of the program
   */
  readonly body: Token[];

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.body = matchedTokens;
  }

  build(): string {
    return this.body.map(token => token.build()).join(';');
  }
}
