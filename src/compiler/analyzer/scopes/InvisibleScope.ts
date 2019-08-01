import { Scope } from './Scope';

export class InvisibleScope extends Scope {
  readonly parent: Scope;

  constructor(parent: Scope) {
    super();

    this.parent = parent;
  }
}
