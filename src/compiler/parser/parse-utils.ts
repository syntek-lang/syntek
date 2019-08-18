import {
  Node, Token, LexicalToken, VariableType, FunctionParam,
  Identifier, MemberExpression,
} from '../../grammar';

import { Parser } from '..';
import { Span } from '../../position';

export interface VarLoc {
  node: Identifier | MemberExpression;
  size: number;
}

export interface TypeDecl {
  variableType: VariableType;
  size: number;
}

export interface VarDecl {
  variableType: VariableType | null;
  identifier: Token;
  size: number;
  span: Span;
}

/**
 * Check for a variable location
 *
 * @see https://docs.syntek.dev/spec/grammar/syntactic/#variable-location
 *
 * @param parser - The parser object
 * @returns Information about the variable location, or null
 */
export function checkVarLoc(parser: Parser): VarLoc | null {
  if (!parser.check(LexicalToken.IDENTIFIER)) {
    return null;
  }

  const identifier = parser.peek();
  let node: Identifier | MemberExpression = new Identifier(identifier);

  let offset = 1;
  while (parser.check(LexicalToken.DOT, offset)) {
    if (!parser.check(LexicalToken.IDENTIFIER, offset + 1)) {
      return null;
    }

    const prop = parser.peek(offset + 1);
    node = new MemberExpression(node, prop, new Span(identifier.span.start, prop.span.end));
    offset += 2;
  }

  return { node, size: offset };
}

/**
 * Check for a type declaration
 *
 * @see https://docs.syntek.dev/spec/grammar/syntactic/#type
 *
 * @param parser - The parser object
 * @returns Information about the type declaration, or null
 */
export function checkTypeDecl(parser: Parser): TypeDecl | null {
  const varLoc = checkVarLoc(parser);
  if (!varLoc) {
    return null;
  }

  // Check for array brackets
  let offset = varLoc.size;
  while (parser.check(LexicalToken.LSQB, offset)) {
    // Return if there is no closing bracket after the opening bracket
    if (!parser.check(LexicalToken.RSQB, offset + 1)) {
      return null;
    }

    offset += 2;
  }

  return {
    variableType: {
      type: varLoc.node,
      arrayDepth: (offset - varLoc.size) / 2,
      span: new Span(parser.peek().span.start, parser.peek(offset - 1).span.end),
    },
    size: offset,
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
  const offset = typeDecl.size;
  if (parser.check(LexicalToken.IDENTIFIER, offset)) {
    return {
      variableType: typeDecl.variableType,
      identifier: parser.peek(offset),
      size: offset + 1,
      span: new Span(typeDecl.variableType.span.start, parser.peek(offset).span.end),
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
    let variableType: VariableType | null = null;

    if (parser.check(LexicalToken.LSQB, 1) || parser.check(LexicalToken.IDENTIFIER, 1)) {
      // Number[] x
      const typeDecl = checkTypeDecl(parser);
      if (!typeDecl) {
        throw parser.error('Expected type', parser.peek().span);
      }

      parser.skip(typeDecl.size);
      variableType = typeDecl.variableType;
    }

    const name = parser.consume(LexicalToken.IDENTIFIER, 'Expected param name');
    params.push({ name, variableType });

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
