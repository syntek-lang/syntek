import { SyntacticToken, TokenLocation } from '.';

export class Node {
  readonly type: SyntacticToken;

  readonly location: TokenLocation;

  constructor(type: SyntacticToken, location: TokenLocation) {
    this.type = type;
    this.location = location;
  }
}
