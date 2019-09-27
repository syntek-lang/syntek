import {
  Node, Token, LexicalToken, ClassDeclaration, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchGenericParams, matchTypeDecl } from '../../parse-utils';

export function classDecl(parser: Parser): Node {
  const classSpan = parser.previous().span;

  const identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'class'", (error) => {
    error.info('Add an identifier after this class', classSpan);
  });

  let genericParams: Token[] = [];
  if (parser.match(LexicalToken.LT)) {
    genericParams = matchGenericParams(parser);
  }

  const extend: VariableType[] = [];
  if (parser.match(LexicalToken.EXTENDS)) {
    do {
      extend.push(matchTypeDecl(parser));
    } while (parser.match(LexicalToken.COMMA));
  }

  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const staticBody: Node[] = [];
  const instanceBody: Node[] = [];
  while (!parser.match(LexicalToken.R_BRACE)) {
    if (parser.match(LexicalToken.STATIC)) {
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
