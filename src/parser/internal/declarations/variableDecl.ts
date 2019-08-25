import {
  Node, LexicalToken, VariableType,
  EmptyVariableDeclaration, VariableDeclaration,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchTypeDecl } from '../../parse-utils';

export function variableDecl(parser: Parser, allowEmptyDeclaration = false): Node {
  const start = parser.peek().span.start;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected an identifier after "var"');

  let variableType: VariableType | null = null;
  if (parser.matchIgnoreWhitespace(LexicalToken.COLON)) {
    parser.eatWhitespace();
    variableType = matchTypeDecl(parser);
  }

  // If it's followed with an assignment return a variable declaration
  if (parser.matchIgnoreWhitespace(LexicalToken.EQUAL)) {
    const equalSpan = parser.previous().span;
    parser.eatWhitespace();

    const expr = parser.expression("Expected an expression after '='", (error) => {
      error.info('Add an expression after this =', equalSpan);
    });

    parser.consume(LexicalToken.NEWLINE, 'Expected a newline after the variable declaration', (error) => {
      error.info('Add a newline after this expression', expr.span);
    });

    parser.syncIndentation();

    return new VariableDeclaration(
      identifier,
      variableType,
      expr,
      new Span(start, parser.previous().span.end),
    );
  }

  // The declaration is not followed with an assignment
  // If it is allowed return an empty declaration
  if (allowEmptyDeclaration) {
    const declarationSpan = new Span(start, parser.previous().span.end);

    parser.consume(LexicalToken.NEWLINE, 'Expected a newline after the variable declaration', (error) => {
      error.info('Add a newline after the declaration', declarationSpan);
    });

    parser.syncIndentation();

    return new EmptyVariableDeclaration(
      identifier,
      variableType,
      declarationSpan,
    );
  }

  // Empty declarations are not allowed
  throw parser.error("Expected '='", new Span(start, parser.previous().span.end));
}
