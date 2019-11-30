import { Type } from '../../types';
import { Scope } from '../scopes/Scope';
import { Node, DeclarationNode } from '../../grammar';

export class SymbolEntry {
  readonly node: DeclarationNode;

  readonly scope: Scope;

  readonly refs: Node[] = [];

  private type?: Type;

  constructor(node: DeclarationNode, scope: Scope) {
    this.node = node;
    this.scope = scope;
  }

  getType(): Type {
    if (this.type) {
      return this.type;
    }

    throw new Error('Type is not set');
  }

  setType(type: Type): void {
    if (this.type) {
      throw new Error('Can not change type');
    }

    this.type = type;
  }

  hasType(): boolean {
    return !!this.type;
  }
}
