import { Scope } from './Scope';
import { Program } from '../../../grammar';

export class FileScope extends Scope {
  readonly node: Program;

  constructor(node: Program) {
    super(node.span);

    this.node = node;
  }

  getParent(): Scope {
    return this;
  }
}
