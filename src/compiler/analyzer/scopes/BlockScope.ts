import { Scope } from './Scope';
import { Node } from '../../../grammar';
import { Span } from '../../../position';

export class BlockScope extends Scope {
  readonly node: Node;

  readonly parent: Scope;

  constructor(node: Node, parent: Scope, span: Span) {
    super(span);

    this.node = node;
    this.parent = parent;
  }

  getParent(): Scope {
    return this.parent;
  }
}
