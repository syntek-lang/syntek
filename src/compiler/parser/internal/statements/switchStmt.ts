import {
  Node, LexicalToken, SwitchStatement, SwitchCase,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function switchStmt(parser: Parser): Node {
  const switchSpan = parser.previous().span;
  parser.eatWhitespace();

  const expression = parser.expression("Expected an expression after 'switch'", (error) => {
    error.info('Add an expression after this switch', switchSpan);
  });

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline and indent after the switch statement', (error) => {
    error.info('Add a newline after the expression', expression.span);
  });
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected a newline and indent after the switch statement', (error) => {
    error.info('Add an indent after the expression', expression.span);
  });

  const cases: SwitchCase[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    const caseSpan = parser.consume(LexicalToken.CASE, "Expected 'case'").span;

    const conditions: Node[] = [];
    do {
      parser.eatWhitespace();

      const condition = parser.expression("Expected a list of expressions after 'case'", (error) => {
        error.info('Add one or more expressions after this case', caseSpan);
      });

      conditions.push(condition);

      if (parser.peekIgnoreWhitespace().type === LexicalToken.COMMA) {
        parser.eatWhitespace();
      }
    } while (parser.match(LexicalToken.COMMA));

    parser.consume(LexicalToken.NEWLINE, 'Expected a newline and indent after the switch case', (error) => {
      error.info('Add a newline after this expression', conditions[conditions.length - 1].span);
    });
    parser.syncIndentation();
    parser.consume(LexicalToken.INDENT, 'Expected a newline and indent after the switch case', (error) => {
      error.info('Add an indent after this expression', conditions[conditions.length - 1].span);
    });

    const body: Node[] = [];
    while (!parser.match(LexicalToken.OUTDENT)) {
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
