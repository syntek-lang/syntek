import { Node } from '../../../grammar';
import { Scope } from '../..';

export class SymbolEntry {
  readonly node: Node | null;

  readonly scope: Scope;

  constructor(node: Node | null, scope: Scope) {
    this.node = node;
    this.scope = scope;
  }
}
