import {
  Node, Token, LexicalToken, FunctionDeclaration, VariableType,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { matchGenericParams, matchTypeDecl, matchFunctionParams } from '../../parse-utils';

export function functionDecl(parser: Parser): Node {
  const functionSpan = parser.previous().span;
  parser.eatWhitespace();

  let genericParams: Token[] = [];
  if (parser.match(LexicalToken.LT)) {
    genericParams = matchGenericParams(parser);
    parser.eatWhitespace();
  }

  const identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'function'", (error) => {
    error.info('Add an identifier after this function', functionSpan);
  });
  parser.eatWhitespace();

  parser.consume(LexicalToken.LPAR, "Expected '(' after the function name", (error) => {
    error.info("Add '(' after this identifier", identifier.span);
  });
  const params = matchFunctionParams(parser);

  let returnType: VariableType | null = null;
  if (parser.peekIgnoreWhitespace().type === LexicalToken.COLON) {
    parser.eatWhitespace();
    parser.advance();
    parser.eatWhitespace();
    returnType = matchTypeDecl(parser);
  }

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline and indent after the function signature');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected a newline and indent after the function signature');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
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
