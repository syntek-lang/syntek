import { Node } from '../../grammar';
import { Scope } from '..';

export class SymbolEntry {
  readonly node: Node;

  readonly scope: Scope;

  readonly references: Node[] = [];

  constructor(node: Node, scope: Scope) {
    this.node = node;
    this.scope = scope;
  }
}
