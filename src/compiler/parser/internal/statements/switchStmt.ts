import {
  Node, LexicalToken, SwitchStatement, SwitchCase,
} from '../../../../grammar';

import { Parser } from '../../..';

export function switchStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const expression = parser.expression('stmt.switch.expression_after_switch"');
  parser.consume(LexicalToken.NEWLINE, 'stmt.switch.newline_indent_after_switch');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'stmt.switch.newline_indent_after_switch');

  const cases: SwitchCase[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    const caseKeyword = parser.consume(LexicalToken.CASE, 'stmt.switch.expected_case');

    const conditions: Node[] = [];
    do {
      parser.eatWhitespace();
      conditions.push(parser.expression('stmt.switch.expression_list_after_case'));

      if (parser.peekIgnoreWhitespace().type === LexicalToken.COMMA) {
        parser.eatWhitespace();
      }
    } while (parser.match(LexicalToken.COMMA));

    parser.consume(LexicalToken.NEWLINE, 'stmt.switch.newline_indent_after_case');
    parser.syncIndentation();
    parser.consume(LexicalToken.INDENT, 'stmt.switch.newline_indent_after_case');

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
