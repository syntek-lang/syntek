import {
  Node, Identifier, LexicalToken, VariableType, FunctionParam,
} from '../../grammar';

import { Parser } from '..';
import { Span } from '../../position';

export interface VarDecl {
  variableType: VariableType | null;
  identifier: Identifier;
  span: Span;
}

export function checkType(parser: Parser): VariableType | null {
  if (!parser.check(LexicalToken.IDENTIFIER) && !parser.check(LexicalToken.ANY)) {
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
    type: new Identifier(parser.peek()),
    arrayDepth: (offset - 1) / 2,
    span: new Span(
      parser.peek().span.start,
      [parser.peek().span.end[0], parser.peek().span.end[1] + (offset - 1)],
    ),
  };
}

export function checkVar(parser: Parser): VarDecl | null {
  const typeDecl = checkType(parser);
  if (!typeDecl) {
    return null;
  }

  const offset = typeDecl.arrayDepth * 2 + 1;
  if (parser.check(LexicalToken.IDENTIFIER, offset)) {
    return {
      variableType: typeDecl,
      identifier: new Identifier(parser.peek(offset)),
      span: new Span(typeDecl.span.start, parser.peek(offset).span.end),
    };
  }

  return {
    variableType: null,
    identifier: new Identifier(parser.peek()),
    span: parser.peek().span,
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
        throw parser.error('Expected type', parser.peek().span);
      }

      parser.skip(typeDecl.arrayDepth * 2 + 1);
    }

    const name = parser.consume(LexicalToken.IDENTIFIER, 'Expected param name');
    params.push({
      name: new Identifier(name),
      variableType: typeDecl,
    });

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
    expressions.push(parser.expression('Expected list of expressions'));
    parser.eatWhitespace();

    if (!parser.check(closingToken)) {
      parser.consume(LexicalToken.COMMA, 'Expected ","');
      parser.eatWhitespace();
    }
  }

  return expressions;
}
