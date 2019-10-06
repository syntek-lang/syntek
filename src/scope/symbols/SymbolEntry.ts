import { Scope } from '../scopes/Scope';
import { Node } from '../../grammar';

export class SymbolEntry {
  readonly node: Node;

  readonly scope: Scope;

  readonly refs: Node[] = [];

  constructor(node: Node, scope: Scope) {
    this.node = node;
    this.scope = scope;
  }
}
