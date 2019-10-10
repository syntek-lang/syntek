import {
  Node, Token, LexicalToken, ClassDeclaration, ClassProp, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchGenericParams, matchTypeDecl } from '../../parse-utils';

export function classDecl(parser: Parser): Node {
  const isAbstract = parser.previous().type === LexicalToken.ABSTRACT;

  let classToken: Token;
  if (isAbstract) {
    parser.ignoreNewline();

    classToken = parser.consume(LexicalToken.CLASS, "Expected 'class' after 'abstract'");
  } else {
    classToken = parser.previous();
  }

  parser.ignoreNewline();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, "Expected an identifier after 'class'", (error) => {
    error.info('Add an identifier after this class', classToken.span);
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

  const body: ClassProp[] = [];
  while (!parser.matchIgnoreNewline(LexicalToken.R_BRACE)) {
    let abstract = false;
    let isStatic = false;

    while (parser.matchIgnoreNewline(LexicalToken.ABSTRACT, LexicalToken.STATIC)) {
      if (parser.previous().type === LexicalToken.ABSTRACT) {
        abstract = true;
      } else {
        isStatic = true;
      }
    }

    parser.ignoreNewline();
    const decl = parser.declaration();

    body.push(new ClassProp(decl, abstract, isStatic, decl.span));
  }

  return new ClassDeclaration(
    isAbstract,
    identifier,
    genericParams,
    extend,
    body,
    new Span(classToken.span.start, parser.previous().span.end),
  );
}
