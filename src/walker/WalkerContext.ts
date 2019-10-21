import { Scope } from '../scope';
import { Node } from '../grammar';

export class WalkerContext {
  readonly parents: Node[];

  private readonly scope?: Scope;

  constructor(parents: Node[], scope?: Scope) {
    this.parents = parents;
    this.scope = scope;
  }

  getScope(): Scope {
    if (this.scope) {
      return this.scope;
    }

    throw new Error('Scope is not available at this stage');
  }

  hasScope(): boolean {
    return !!this.scope;
  }
}
