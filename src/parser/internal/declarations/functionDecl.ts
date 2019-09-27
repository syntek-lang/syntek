import {
  Node, Token, LexicalToken, FunctionDeclaration, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchGenericParams, matchTypeDecl, matchFunctionParams } from '../../parse-utils';

export function functionDecl(parser: Parser): Node {
  const functionSpan = parser.previous().span;

  let genericParams: Token[] = [];
  if (parser.match(LexicalToken.LT)) {
    genericParams = matchGenericParams(parser);
  }

  const identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'function'", (error) => {
    error.info('Add an identifier after this function', functionSpan);
  });

  parser.consume(LexicalToken.L_PAR, "Expected '(' after the function name", (error) => {
    error.info("Add '(' after this identifier", identifier.span);
  });
  const params = matchFunctionParams(parser);

  let returnType: VariableType | null = null;
  if (parser.match(LexicalToken.COLON)) {
    parser.advance();
    returnType = matchTypeDecl(parser);
  }

  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const body: Node[] = [];
  while (!parser.match(LexicalToken.R_BRACE)) {
    body.push(parser.declaration());
  }

  return new FunctionDeclaration(
    identifier,
    genericParams,
    params,
    returnType,
    body,
    new Span(functionSpan.start, parser.previous().span.end),
  );
}
