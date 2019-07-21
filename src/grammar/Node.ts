import { SyntacticToken } from '.';
import { Span } from '../position';

export class Node {
  readonly type: SyntacticToken;

  readonly span: Span;

  constructor(type: SyntacticToken, span: Span) {
    this.type = type;
    this.span = span;
  }
}
