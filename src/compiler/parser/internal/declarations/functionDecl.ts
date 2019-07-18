import {
  Node, LexicalToken, FunctionDeclaration, VariableType,
} from '../../../../grammar';

import { Parser } from '../../..';
import { checkType, matchFunctionParams } from '../../parse-utils';

export function functionDecl(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after function keyword');
  parser.eatWhitespace();

  parser.consume(LexicalToken.LPAR, 'Expected "(" after function name');
  const params = matchFunctionParams(parser);

  let returnType: VariableType | null = null;
  if (parser.peekIgnoreWhitespace().type === LexicalToken.RETURNS) {
    parser.eatWhitespace();
    parser.advance();

    returnType = checkType(parser);

    if (!returnType) {
      throw parser.error(parser.peek(), 'Expected type after returns');
    }

    parser.skip(returnType.arrayDepth * 2 + 1);
  }

  parser.consume(LexicalToken.NEWLINE, 'Expected newline after function signature');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after function signature');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new FunctionDeclaration(
    identifier,
    params,
    returnType,
    body,
    {
      start,
      end: parser.previous().location.end,
    },
  );
}
