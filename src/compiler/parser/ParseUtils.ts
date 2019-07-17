import {
  Node, Token, LexicalToken, VariableType, FunctionParam,
} from '../../grammar';

import { Parser } from '..';

export interface VarDecl {
  variableType: VariableType | null;
  identifier: Token;
}

export function checkType(parser: Parser): VariableType | null {
  if (!parser.check(LexicalToken.IDENTIFIER)) {
    return null;
  }

  let offset = 1;
  while (parser.check(LexicalToken.LSQB, offset)) {
    if (!parser.check(LexicalToken.RSQB, offset + 1)) {
      return null;
    }

    offset += 2;
  }

  return {
    type: parser.peek(),
    arrayDepth: (offset - 1) / 2,
  };
}

export function checkVar(parser: Parser): VarDecl | null {
  if (!parser.check(LexicalToken.IDENTIFIER)) {
    return null;
  }

  const typeDecl = checkType(parser);
  if (!typeDecl) {
    return null;
  }

  const offset = typeDecl.arrayDepth * 2 + 1;
  if (parser.check(LexicalToken.IDENTIFIER, offset)) {
    return {
      variableType: {
        type: typeDecl.type,
        arrayDepth: typeDecl.arrayDepth,
      },
      identifier: parser.peek(offset),
    };
  }

  return {
    variableType: null,
    identifier: parser.peek(),
  };
}

export function skipVarSize(parser: Parser, varDecl: VarDecl): void {
  if (varDecl.variableType) {
    parser.skip(varDecl.variableType.arrayDepth * 2 + 2);
  } else {
    parser.skip(1);
  }
}

export function matchFunctionParams(parser: Parser): FunctionParam[] {
  const params: FunctionParam[] = [];
  parser.eatWhitespace();

  while (!parser.match(LexicalToken.RPAR)) {
    let typeDecl: VariableType | null = null;

    if (parser.check(LexicalToken.LSQB, 1) || parser.check(LexicalToken.IDENTIFIER, 1)) {
      // Number[] x
      typeDecl = checkType(parser);
      if (!typeDecl) {
        throw new Error('Expected type');
      }

      parser.skip(typeDecl.arrayDepth * 2 + 1);
    }

    const name = parser.consume(LexicalToken.IDENTIFIER, 'Expected param name');
    params.push({ name, variableType: typeDecl });

    parser.eatWhitespace();
    if (parser.peek().type !== LexicalToken.RPAR) {
      parser.consume(LexicalToken.COMMA, 'Expected ","');
      parser.eatWhitespace();
    }
  }

  return params;
}

export function matchExpressionList(parser: Parser, closingToken: LexicalToken): Node[] {
  const expressions: Node[] = [];
  parser.eatWhitespace();

  while (!parser.match(closingToken)) {
    expressions.push(parser.expression());
    parser.eatWhitespace();

    if (!parser.check(closingToken)) {
      parser.consume(LexicalToken.COMMA, 'Expected ","');
      parser.eatWhitespace();
    }
  }

  return expressions;
}
