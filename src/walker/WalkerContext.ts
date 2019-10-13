import { Scope } from '../scope';
import { Node } from '../grammar';

export class WalkerContext {
  readonly parents: Node[];

  private readonly privateScope?: Scope;

  constructor(parents: Node[], scope?: Scope) {
    this.parents = parents;
    this.privateScope = scope;
  }

  get scope(): Scope {
    if (this.privateScope) {
      return this.privateScope;
    }

    throw new Error('Scope is not available at this stage');
  }

  hasScope(): boolean {
    return !!this.privateScope;
  }
}
