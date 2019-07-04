import { Node, SyntacticToken, TokenLocation } from '../..';

export class Program extends Node {
  readonly body: Node[];

  constructor(body: Node[], location: TokenLocation) {
    super(SyntacticToken.PROGRAM, location);

    this.body = body;
  }
}

export class SwitchCase extends Node {
  readonly conditions: Node[];

  readonly body: Node[];

  constructor(conditions: Node[], body: Node[], location: TokenLocation) {
    super(SyntacticToken.SWITCH_CASE, location);

    this.conditions = conditions;
    this.body = body;
  }
}
