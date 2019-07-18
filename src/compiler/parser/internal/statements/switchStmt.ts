import {
  Node, LexicalToken, SwitchStatement, SwitchCase,
} from '../../../../grammar';

import { Parser } from '../../..';

export function switchStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const expression = parser.expression('Expected expression after "switch"');
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after switch');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after switch');

  const cases: SwitchCase[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    const caseKeyword = parser.consume(LexicalToken.CASE, 'Expected case');

    const conditions: Node[] = [];
    do {
      parser.eatWhitespace();
      conditions.push(parser.expression('Expected list of expressions after "case"'));

      if (parser.peekIgnoreWhitespace().type === LexicalToken.COMMA) {
        parser.eatWhitespace();
      }
    } while (parser.match(LexicalToken.COMMA));

    parser.consume(LexicalToken.NEWLINE, 'Expected newline after case');
    parser.syncIndentation();
    parser.consume(LexicalToken.INDENT, 'Expected indent after case');

    const body: Node[] = [];
    while (!parser.match(LexicalToken.OUTDENT)) {
      body.push(parser.declaration());
    }

    cases.push(new SwitchCase(conditions, body, {
      start: caseKeyword.location.start,
      end: parser.previous().location.end,
    }));
  }

  return new SwitchStatement(expression, cases, {
    start,
    end: parser.previous().location.end,
  });
}
