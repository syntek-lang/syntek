import {
  Node, Token, LexicalToken, FunctionDeclaration, EmptyFunctionDeclaration, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import {
  matchGenericParams, matchTypeDecl, matchFunctionParams, matchBlock,
} from '../../parse-utils';

export function functionDecl(parser: Parser): Node {
  const functionSpan = parser.previous().span;

  let genericParams: Token[] = [];
  if (parser.matchIgnoreNewline(LexicalToken.LT)) {
    parser.ignoreNewline();

    genericParams = matchGenericParams(parser);
  }

  parser.ignoreNewline();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'function'", (error) => {
    error.info('Add an identifier after this function', functionSpan);
  });

  parser.ignoreNewline();

  parser.consume(LexicalToken.L_PAR, "Expected '(' after the function name", (error) => {
    error.info("Add '(' after this identifier", identifier.span);
  });
  const params = matchFunctionParams(parser);

  let returnType: VariableType | null = null;
  if (parser.matchIgnoreNewline(LexicalToken.COLON)) {
    parser.ignoreNewline();

    returnType = matchTypeDecl(parser);
  }

  if (parser.checkIgnoreNewline(LexicalToken.L_BRACE)) {
    const body = matchBlock(parser);

    return new FunctionDeclaration(
      identifier,
      genericParams,
      params,
      returnType,
      body,
      new Span(functionSpan.start, parser.previous().span.end),
    );
  }

  return new EmptyFunctionDeclaration(
    identifier,
    genericParams,
    params,
    returnType,
    new Span(functionSpan.start, parser.previous().span.end),
  );
}
