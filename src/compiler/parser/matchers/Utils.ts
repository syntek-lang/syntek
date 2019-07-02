import { Node, LexicalToken } from '../..';

import { Parser } from '../Parser';

export class Utils {
  static matchExpressionList(this: Parser, closingToken: LexicalToken): Node[] {
    const params: Node[] = [];

    this.eatWhitespace();

    while (!this.match(closingToken)) {
      params.push(this.expression());
      this.eatWhitespace();

      if (this.peek().type !== closingToken) {
        this.consume(LexicalToken.COMMA, 'Expected ","');
        this.eatWhitespace();
      }
    }

    return params;
  }
}
