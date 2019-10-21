import { Scope } from '../scopes/Scope';
import { Node, VariableType } from '../../grammar';

export class SymbolEntry {
  readonly node: Node;

  readonly scope: Scope;

  readonly refs: Node[] = [];

  private type?: VariableType;

  constructor(node: Node, scope: Scope, type?: VariableType) {
    this.node = node;
    this.scope = scope;
    this.type = type;
  }

  getType(): Node {
    if (this.type) {
      return this.type;
    }

    throw new Error('Type is not set');
  }

  setType(type: VariableType): void {
    if (this.type) {
      throw new Error('Can not change type');
    }

    this.type = type;
  }
}
