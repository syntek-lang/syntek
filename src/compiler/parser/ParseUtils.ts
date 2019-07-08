import {
  Node, Token, LexicalToken, VariableType,
} from '../../grammar';

import { Parser } from '..';

export interface TypeDeclReport {
  match: boolean;
  variableType: VariableType;
}

export interface VarDeclReport extends TypeDeclReport {
  identifier: Token | null;
}

export class ParseUtils {
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

  static matchTypeDecl(this: Parser): TypeDeclReport {
    if (!this.check(LexicalToken.IDENTIFIER)) {
      return {
        match: false,
        variableType: null,
      };
    }

    // Number x
    if (this.check(LexicalToken.IDENTIFIER, 1)) {
      return {
        match: true,
        variableType: null,
      };
    }

    // Number[] x
    // Number[][] x
    // Number[][][] x
    let offset = 1;
    while (this.check(LexicalToken.LSQB, offset) && this.check(LexicalToken.RSQB, offset + 1)) {
      offset += 2;
    }

    if (this.check(LexicalToken.IDENTIFIER, offset)) {
      const type = this.advance();
      const arrayDepth = (offset - 1) / 2;

      for (let i = 0; i < arrayDepth; i += 1) {
        this.advance();
        this.advance();
      }

      return {
        match: true,
        variableType: {
          type,
          arrayDepth,
        },
      };
    }

    return {
      match: false,
      variableType: null,
    };
  }

  static checkVarDecl(this: Parser): VarDeclReport {
    // Variable declarations always start with an identifier
    if (!this.check(LexicalToken.IDENTIFIER)) {
      return {
        match: false,
        identifier: null,
        variableType: null,
      };
    }

    // x = ...
    if (this.check(LexicalToken.EQUAL, 1)) {
      return {
        match: true,
        identifier: this.peek(),
        variableType: null,
      };
    }

    // Number x = ...
    if (this.check(LexicalToken.IDENTIFIER, 1) && this.check(LexicalToken.EQUAL, 2)) {
      return {
        match: true,
        identifier: this.peek(1),
        variableType: {
          type: this.peek(),
          arrayDepth: 0,
        },
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
        match: true,
        identifier: this.peek(offset),
        variableType: {
          type: this.peek(),
          arrayDepth: (offset - 1) / 2,
        },
      };
    }

    return {
      match: false,
      identifier: null,
      variableType: null,
    };
  }
}
