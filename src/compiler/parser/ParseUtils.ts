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
  static matchExpressionList(parser: Parser, closingToken: LexicalToken): Node[] {
    const params: Node[] = [];

    parser.eatWhitespace();

    while (!parser.match(closingToken)) {
      params.push(parser.expression());
      parser.eatWhitespace();

      if (parser.peek().type !== closingToken) {
        parser.consume(LexicalToken.COMMA, 'Expected ","');
        parser.eatWhitespace();
      }
    }

    return params;
  }

  static matchTypeDecl(parser: Parser): TypeDeclReport {
    if (!parser.check(LexicalToken.IDENTIFIER)) {
      return {
        match: false,
        variableType: null,
      };
    }

    // Number x
    if (parser.check(LexicalToken.IDENTIFIER, 1)) {
      return {
        match: true,
        variableType: null,
      };
    }

    // Number[] x
    // Number[][] x
    // Number[][][] x
    let offset = 1;
    while (parser.check(LexicalToken.LSQB, offset) && parser.check(LexicalToken.RSQB, offset + 1)) {
      offset += 2;
    }

    if (parser.check(LexicalToken.IDENTIFIER, offset)) {
      const type = parser.advance();
      const arrayDepth = (offset - 1) / 2;

      for (let i = 0; i < arrayDepth; i += 1) {
        parser.advance();
        parser.advance();
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

  static checkVarDecl(parser: Parser): VarDeclReport {
    // Variable declarations always start with an identifier
    if (!parser.check(LexicalToken.IDENTIFIER)) {
      return {
        match: false,
        identifier: null,
        variableType: null,
      };
    }

    // x = ...
    if (parser.check(LexicalToken.EQUAL, 1)) {
      return {
        match: true,
        identifier: parser.peek(),
        variableType: null,
      };
    }

    // Number x = ...
    if (parser.check(LexicalToken.IDENTIFIER, 1) && parser.check(LexicalToken.EQUAL, 2)) {
      return {
        match: true,
        identifier: parser.peek(1),
        variableType: {
          type: parser.peek(),
          arrayDepth: 0,
        },
      };
    }

    // Number[] x = ...
    // Number[][] x = ...
    // Number[][][] x = ...
    let offset = 1;
    while (parser.check(LexicalToken.LSQB, offset) && parser.check(LexicalToken.RSQB, offset + 1)) {
      offset += 2;
    }

    if (
      parser.check(LexicalToken.IDENTIFIER, offset)
        && parser.check(LexicalToken.EQUAL, offset + 1)
    ) {
      return {
        match: true,
        identifier: parser.peek(offset),
        variableType: {
          type: parser.peek(),
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
