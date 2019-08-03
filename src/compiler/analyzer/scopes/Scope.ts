import { Node } from '../../../grammar';
import { Span } from '../../../position';

import { ClassScope } from './ClassScope';
import { BlockScope } from './BlockScope';
import { FunctionScope } from './FunctionScope';

export abstract class Scope {
  readonly span: Span;

  readonly imports: Node[] = [];

  readonly variables: Node[] = [];

  readonly classes: ClassScope[] = [];

  readonly branches: BlockScope[] = [];

  readonly functions: FunctionScope[] = [];

  constructor(span: Span) {
    this.span = span;
  }

  abstract node: Node;

  abstract getParent(): Scope;
}
