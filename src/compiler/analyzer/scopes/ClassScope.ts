import { Scope } from './Scope';
import { ClassDeclaration } from '../../../grammar';

export class ClassScope extends Scope {
  readonly node: ClassDeclaration;

  readonly parent: Scope;

  constructor(node: ClassDeclaration, parent: Scope) {
    super(node.span);

    this.node = node;
    this.parent = parent;
  }

  getParent(): Scope {
    return this.parent;
  }
}
