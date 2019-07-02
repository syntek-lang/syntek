import { Node, SyntacticToken, TokenLocation } from '../..';

export class Program extends Node {
  readonly body: Node[];

  constructor(body: Node[], location: TokenLocation) {
    super(SyntacticToken.PROGRAM, location);

    this.body = body;
  }
}
