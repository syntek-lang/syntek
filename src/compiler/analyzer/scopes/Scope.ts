import { Node } from '../../../grammar';
import { Span } from '../../../position';

export abstract class Scope {
  readonly span: Span;

  readonly imports: Node[] = [];

  readonly classes: Node[] = [];

  readonly variables: Node[] = [];

  readonly functions: Node[] = [];

  readonly branches: Scope[] = [];

  constructor(span: Span) {
    this.span = span;
  }

  abstract getParent(): Scope;
}
