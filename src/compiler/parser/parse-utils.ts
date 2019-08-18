import {
  Node, Token, LexicalToken, VariableType, FunctionParam,
} from '../../grammar';

import { Parser } from '..';
import { Span } from '../../position';

export interface VarDecl {
  variableType: VariableType | null;
  identifier: Token;
  size: number;
  span: Span;
}

/**
 * Check for a type declaration
 *
 * @param parser - The parser object
 * @returns Information about the type declaration, or null
 */
export function checkTypeDecl(parser: Parser): VariableType | null {
  // Types must start with an identifier
  if (!parser.check(LexicalToken.IDENTIFIER)) {
    return null;
  }

  // Check for array brackets
  let offset = 1;
  while (parser.check(LexicalToken.LSQB, offset)) {
    // Return if there is no closing bracket after the opening bracket
    if (!parser.check(LexicalToken.RSQB, offset + 1)) {
      return null;
    }

    offset += 2;
  }

  return {
    type: parser.peek(),
    arrayDepth: (offset - 1) / 2,
    span: new Span(
      parser.peek().span.start,
      [parser.peek().span.end[0], parser.peek().span.end[1] + (offset - 1)],
    ),
  };
}

/**
 * Check for a variable declaration
 *
 * @param parser - The parser object
 * @param requirePrefix - If `true` the declaration should start with `var` or a type
 * @returns Information about the variable declaration, or null
 */
export function checkVarDecl(parser: Parser, requirePrefix = false): VarDecl | null {
  // Check for a declaration starting with `var`
  if (parser.check(LexicalToken.VAR)) {
    // `var` should be followed with an identifier
    if (parser.check(LexicalToken.IDENTIFIER, 1)) {
      return {
        variableType: null,
        identifier: parser.peek(1),
        size: 2,
        span: new Span(parser.peek().span.start, parser.peek(1).span.end),
      };
    }

    // `var` is not followed with an identifier
    return null;
  }

  // Check for a type declaration
  const typeDecl = checkTypeDecl(parser);
  if (!typeDecl) {
    return null;
  }

  // Check if the type is followed by an identifier
  const offset = typeDecl.arrayDepth * 2 + 1;
  if (parser.check(LexicalToken.IDENTIFIER, offset)) {
    return {
      variableType: typeDecl,
      identifier: parser.peek(offset),
      size: offset + 1,
      span: new Span(typeDecl.span.start, parser.peek(offset).span.end),
    };
  }

  // Not a declaration
  if (requirePrefix) {
    return null;
  }

  return {
    variableType: null,
    identifier: parser.peek(),
    size: 1,
    span: parser.peek().span,
  };
}

export function matchFunctionParams(parser: Parser): FunctionParam[] {
  const params: FunctionParam[] = [];
  parser.eatWhitespace();

  while (!parser.match(LexicalToken.RPAR)) {
    let typeDecl: VariableType | null = null;

    if (parser.check(LexicalToken.LSQB, 1) || parser.check(LexicalToken.IDENTIFIER, 1)) {
      // Number[] x
      typeDecl = checkTypeDecl(parser);
      if (!typeDecl) {
        throw parser.error('Expected type', parser.peek().span);
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
    expressions.push(parser.expression('Expected list of expressions'));
    parser.eatWhitespace();

    if (!parser.check(closingToken)) {
      parser.consume(LexicalToken.COMMA, 'Expected ","');
      parser.eatWhitespace();
    }
  }

  return expressions;
}
