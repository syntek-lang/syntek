import {
  Node, Token, LexicalToken, ClassDeclaration, Constructor, ClassProp, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import {
  matchGenericParams, matchTypeDecl, matchParamList, matchBlock,
} from '../../parse-utils';

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

  const constructors: Constructor[] = [];
  const staticBody: ClassProp[] = [];
  const instanceBody: ClassProp[] = [];
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

    // Match constructor
    if (parser.matchIgnoreNewline(LexicalToken.NEW)) {
      const newSpan = parser.previous().span;
      parser.ignoreNewline();

      parser.consume(LexicalToken.L_PAR, "Expected '(' after 'new'", (error) => {
        error.info("Add '(' after this identifier", identifier.span);
      });

      const params = matchParamList(parser);
      const body = matchBlock(parser);

      constructors.push(new Constructor(
        params,
        body,
        new Span(newSpan.start, parser.previous().span.end),
      ));
    } else {
      parser.ignoreNewline();
      const decl = parser.declaration();
      const prop = new ClassProp(decl, abstract, isStatic, decl.span);

      if (isStatic) {
        staticBody.push(prop);
      } else {
        instanceBody.push(prop);
      }
    }
  }

  return new ClassDeclaration(
    isAbstract,
    identifier,
    genericParams,
    extend,
    constructors,
    staticBody,
    instanceBody,
    new Span(classToken.span.start, parser.previous().span.end),
  );
}
