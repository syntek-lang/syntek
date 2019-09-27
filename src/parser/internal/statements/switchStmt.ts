import {
  Node, LexicalToken, SwitchStatement, SwitchCase,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function switchStmt(parser: Parser): Node {
  const switchSpan = parser.previous().span;

  const expression = parser.expression("Expected an expression after 'switch'", (error) => {
    error.info('Add an expression after this switch', switchSpan);
  });

  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const cases: SwitchCase[] = [];
  while (!parser.match(LexicalToken.R_BRACE)) {
    const caseSpan = parser.consume(LexicalToken.CASE, "Expected 'case'").span;

    const conditions: Node[] = [];
    do {
      const condition = parser.expression("Expected a list of expressions after 'case'", (error) => {
        error.info('Add one or more expressions after this case', caseSpan);
      });

      conditions.push(condition);
    } while (parser.match(LexicalToken.COMMA));

    parser.consume(LexicalToken.L_BRACE, "Expected '{'");

    const body: Node[] = [];
    while (!parser.match(LexicalToken.R_BRACE)) {
      body.push(parser.declaration());
    }

    cases.push(new SwitchCase(
      conditions,
      body,
      new Span(caseSpan.start, parser.previous().span.end),
    ));
  }

  return new SwitchStatement(
    expression,
    cases,
    new Span(switchSpan.start, parser.previous().span.end),
  );
}
