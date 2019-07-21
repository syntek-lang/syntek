import {
  Node, LexicalToken, FunctionDeclaration, VariableType,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { checkType, matchFunctionParams } from '../../parse-utils';

export function functionDecl(parser: Parser): Node {
  const start = parser.previous().span.start;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'decl.function.identifier_after_function');
  parser.eatWhitespace();

  parser.consume(LexicalToken.LPAR, 'decl.function.lpar_after_function_name');
  const params = matchFunctionParams(parser);

  let returnType: VariableType | null = null;
  if (parser.peekIgnoreWhitespace().type === LexicalToken.RETURNS) {
    parser.eatWhitespace();
    parser.advance();

    returnType = checkType(parser);

    if (!returnType) {
      throw parser.error('decl.function.type_after_returns', parser.peek().span);
    }

    parser.skip(returnType.arrayDepth * 2 + 1);
  }

  parser.consume(LexicalToken.NEWLINE, 'decl.function.newline_indent_after_function_signature');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'decl.function.newline_indent_after_function_signature');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new FunctionDeclaration(
    identifier,
    params,
    returnType,
    body,
    new Span(start, parser.previous().span.end),
  );
}
