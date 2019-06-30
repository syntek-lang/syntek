import { Node, LexicalToken } from '../..';

import { Matcher } from './Matcher';

export class Utils {
  static matchParamList(this: Matcher): Node[] {
    const params: Node[] = [];

    this.eatWhitespace();

    while (!this.match(LexicalToken.RPAR)) {
      params.push(this.expression());
      this.eatWhitespace();

      if (this.peek().type !== LexicalToken.RPAR) {
        this.consume(LexicalToken.COMMA, 'Expected ","');
        this.eatWhitespace();
      }
    }

    return params;
  }
}
