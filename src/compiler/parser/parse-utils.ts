import {
  Node, LexicalToken, VariableType, FunctionParam,
  Identifier, MemberExpression,
} from '../../grammar';

import { Parser } from '..';
import { Span } from '../../position';

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
    node = new MemberExpression(node, prop, new Span(identifier.span.start, prop.span.end));
  }

  return node;
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

  // TODO: Check for generic arguments

  // Check for array brackets
  let arrayDepth = 0;
  while (parser.match(LexicalToken.LSQB)) {
    parser.consume(LexicalToken.RSQB, 'Expected "]" after "["');
    arrayDepth += 1;
  }

  return {
    type: varLoc,
    arrayDepth,
    span: new Span(varLoc.span.start, parser.previous().span.end),
  };
}

export function matchFunctionParams(parser: Parser): FunctionParam[] {
  const params: FunctionParam[] = [];
  parser.eatWhitespace();

  while (!parser.match(LexicalToken.RPAR)) {
    const name = parser.consume(LexicalToken.IDENTIFIER, 'Expected param name');

    let variableType: VariableType | null = null;
    if (parser.match(LexicalToken.COLON)) {
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
