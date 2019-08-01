import { Scope } from './Scope';

export class ClassScope extends Scope {
  readonly parent: Scope;

  constructor(parent: Scope) {
    super();

    this.parent = parent;
  }
}
