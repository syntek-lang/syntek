import {
  Node, Token, LexicalToken, ClassDeclaration, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchGenericParams, matchTypeDecl } from '../../parse-utils';

export function classDecl(parser: Parser): Node {
  const classSpan = parser.previous().span;

  parser.ignoreNewline();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'class'", (error) => {
    error.info('Add an identifier after this class', classSpan);
  });

  let genericParams: Token[] = [];
  if (parser.matchIgnoreNewline(LexicalToken.LT)) {
    parser.ignoreNewline();

    genericParams = matchGenericParams(parser);
  }

  const extend: VariableType[] = [];
  if (parser.matchIgnoreNewline(LexicalToken.EXTENDS)) {
    do {
      parser.ignoreNewline();

      extend.push(matchTypeDecl(parser));
    } while (parser.matchIgnoreNewline(LexicalToken.COMMA));
  }

  parser.ignoreNewline();
  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const staticBody: Node[] = [];
  const instanceBody: Node[] = [];
  while (!parser.matchIgnoreNewline(LexicalToken.R_BRACE)) {
    parser.ignoreNewline();

    if (parser.match(LexicalToken.STATIC)) {
      parser.ignoreNewline();

      staticBody.push(parser.declaration());
    } else {
      instanceBody.push(parser.declaration());
    }
  }

  return new ClassDeclaration(
    identifier,
    genericParams,
    extend,
    staticBody,
    instanceBody,
    new Span(classSpan.start, parser.previous().span.end),
  );
}
