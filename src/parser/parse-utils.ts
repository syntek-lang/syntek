import {
  Node, Token, LexicalToken, VariableType, FunctionParam,
  Identifier, MemberExpression,
} from '../grammar';

import { Parser } from '.';
import { Span } from '../position';

/**
 * Match a variable location
 *
 * @see https://docs.syntek.dev/spec/grammar/syntactic/#variable-location
 *
 * @param parser - The parser object
 * @returns An identifier or member expression
 */
export function matchVarLoc(parser: Parser): Identifier | MemberExpression {
  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected an identifier');
  let node: Identifier | MemberExpression = new Identifier(identifier);

  while (parser.match(LexicalToken.DOT)) {
    const prop = parser.consume(LexicalToken.IDENTIFIER, 'Expected an identifier after the "."');
    node = new MemberExpression(node, prop, new Span(node.span.start, prop.span.end));
  }

  return node;
}

/**
 * Match generic parameters. Assumes `<` is already consumed
 *
 * @see https://docs.syntek.dev/spec/grammar/syntactic/#generic-parameters
 *
 * @param parser - The parser object
 * @returns A list of parameters in the generic
 */
export function matchGenericParams(parser: Parser): Token[] {
  const params: Token[] = [];
  parser.eatWhitespace();

  do {
    params.push(parser.consume(LexicalToken.IDENTIFIER, 'Expected an identifier'));
    parser.eatWhitespace();

    // If the next token is not `>` there should be a comma
    // The comma can also be a trailing comma
    if (!parser.check(LexicalToken.GT)) {
      parser.consume(LexicalToken.COMMA, 'Expected "," or ">"');
      parser.eatWhitespace();
    }
  } while (!parser.match(LexicalToken.GT));

  return params;
}

/**
 * Match generic arguments. Assumes `<` is already consumed
 *
 * @see https://docs.syntek.dev/spec/grammar/syntactic/#generic-arguments
 *
 * @param parser - The parser object
 * @returns A list of variable types that are in the generic
 */
export function matchGenericArgs(parser: Parser): VariableType[] {
  const types: VariableType[] = [];
  parser.eatWhitespace();

  do {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    types.push(matchTypeDecl(parser));
    parser.eatWhitespace();

    // If the next token is not `>` there should be a comma
    // The comma can also be a trailing comma
    if (!parser.check(LexicalToken.GT)) {
      parser.consume(LexicalToken.COMMA, 'Expected "," or ">"');
      parser.eatWhitespace();
    }
  } while (!parser.match(LexicalToken.GT));

  return types;
}

/**
 * Match a type declaration
 *
 * @see https://docs.syntek.dev/spec/grammar/syntactic/#type
 *
 * @param parser - The parser object
 * @returns A variable type
 */
export function matchTypeDecl(parser: Parser): VariableType {
  const varLoc = matchVarLoc(parser);

  // Parse generics
  let generics: VariableType[] = [];
  if (parser.matchIgnoreWhitespace(LexicalToken.LT)) {
    generics = matchGenericArgs(parser);
  }

  // Check for array brackets
  let arrayDepth = 0;
  while (parser.match(LexicalToken.LSQB)) {
    parser.consume(LexicalToken.RSQB, 'Expected "]" after "["');
    arrayDepth += 1;
  }

  return {
    type: varLoc,
    generics,
    arrayDepth,
    span: new Span(varLoc.span.start, parser.previous().span.end),
  };
}

/**
 * Match fuction params. Assumes `(` is already consumed
 *
 * @param parser - The parser object
 * @returns An array of function params
 */
export function matchFunctionParams(parser: Parser): FunctionParam[] {
  const params: FunctionParam[] = [];
  parser.eatWhitespace();

  while (!parser.match(LexicalToken.RPAR)) {
    const name = parser.consume(LexicalToken.IDENTIFIER, 'Expected param name');

    let variableType: VariableType | null = null;
    if (parser.matchIgnoreWhitespace(LexicalToken.COLON)) {
      parser.eatWhitespace();
      variableType = matchTypeDecl(parser);
    }

    params.push({ name, variableType });

    parser.eatWhitespace();
    if (parser.peek().type !== LexicalToken.RPAR) {
      parser.consume(LexicalToken.COMMA, 'Expected ","');
      parser.eatWhitespace();
    }
  }

  return params;
}

/**
 * Match a list of expressions, separated by `,`. Matches until the `closingToken` is reached.
 * Assumes the opening token is already consumed
 *
 * @param parser - The parser object
 * @param closingToken - The type of the closing token
 * @returns An array of expressions
 */
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
