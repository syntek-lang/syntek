import { Node, SyntacticToken } from '..';
import { Span } from '../../position';

export class Program extends Node {
  readonly body: Node[];

  constructor(body: Node[], span: Span) {
    super(SyntacticToken.PROGRAM, span);

    this.body = body;
  }
}

export class SwitchCase extends Node {
  readonly conditions: Node[];

  readonly body: Node[];

  constructor(conditions: Node[], body: Node[], span: Span) {
    super(SyntacticToken.SWITCH_CASE, span);

    this.conditions = conditions;
    this.body = body;
  }
}
