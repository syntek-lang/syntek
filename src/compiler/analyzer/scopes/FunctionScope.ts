import { Scope } from './Scope';
import { FunctionDeclaration } from '../../../grammar';

export class FunctionScope extends Scope {
  readonly node: FunctionDeclaration;

  readonly parent: Scope;

  constructor(node: FunctionDeclaration, parent: Scope) {
    super(node.span);

    this.node = node;
    this.parent = parent;
  }

  getParent(): Scope {
    return this.parent;
  }
}
