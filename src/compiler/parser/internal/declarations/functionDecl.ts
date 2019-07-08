import {
  Node, LexicalToken, VariableType, FunctionDeclaration,
} from '../../../../grammar';

import { Parser, ParseUtils } from '../../..';

export function functionDecl(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after function keyword');
  parser.eatWhitespace();

  parser.consume(LexicalToken.LPAR, 'Expected "(" after function name');
  const params = ParseUtils.matchFunctionParams(parser);

  let returnType: VariableType = null;
  if (parser.peekIgnoreWhitespace().type === LexicalToken.RETURNS) {
    parser.advance();

    const type = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after returns');
    let arrayDepth = 0;

    while (
      parser.check(LexicalToken.LSQB, arrayDepth)
        && parser.check(LexicalToken.RSQB, arrayDepth + 1)
    ) {
      arrayDepth += 2;
    }

    returnType = { type, arrayDepth };
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
