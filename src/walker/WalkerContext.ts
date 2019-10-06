import { Scope } from '../scope';
import { Node } from '../grammar';

export class WalkerContext {
  readonly parents: Node[];

  readonly scope?: Scope;

  constructor(parents: Node[], scope?: Scope) {
    this.parents = parents;
    this.scope = scope;
  }
}
