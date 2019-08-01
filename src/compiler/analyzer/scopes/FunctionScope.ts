import { Scope } from './Scope';

export class FunctionScope extends Scope {
  readonly parent: Scope;

  constructor(parent: Scope) {
    super();

    this.parent = parent;
  }
}
