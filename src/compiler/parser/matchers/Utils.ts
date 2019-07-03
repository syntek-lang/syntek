import { Node, Token, LexicalToken } from '../..';

import { Parser } from '../Parser';

export interface VarDeclReport {
  isVarDecl: boolean;
  identifier: Token | null;
  type: Token | null;
  arrayDepth: number;
}

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

  static varDeclCheck(this: Parser): VarDeclReport {
    // Variable declarations always start with an identifier
    if (!this.check(LexicalToken.IDENTIFIER)) {
      return {
        isVarDecl: false,
        identifier: null,
        type: null,
        arrayDepth: 0,
      };
    }

    // x = ...
    if (this.check(LexicalToken.EQUAL, 1)) {
      return {
        isVarDecl: true,
        identifier: this.peek(),
        type: null,
        arrayDepth: 0,
      };
    }

    // Number x = ...
    if (this.check(LexicalToken.IDENTIFIER, 1) && this.check(LexicalToken.EQUAL, 2)) {
      return {
        isVarDecl: true,
        identifier: this.peek(1),
        type: this.peek(),
        arrayDepth: 0,
      };
    }

    // Number[] x = ...
    // Number[][] x = ...
    // Number[][][] x = ...
    let offset = 1;
    while (this.check(LexicalToken.LSQB, offset) && this.check(LexicalToken.RSQB, offset + 1)) {
      offset += 2;
    }

    if (this.check(LexicalToken.IDENTIFIER, offset) && this.check(LexicalToken.EQUAL, offset + 1)) {
      return {
        isVarDecl: true,
        identifier: this.peek(offset),
        type: this.peek(),
        arrayDepth: (offset - 1) / 2,
      };
    }

    return {
      isVarDecl: false,
      identifier: null,
      type: null,
      arrayDepth: 0,
    };
  }
}
