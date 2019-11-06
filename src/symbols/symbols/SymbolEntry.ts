import { Scope } from '../scopes/Scope';
import { SymbolType } from './SymbolType';
import { Node, DeclarationNode } from '../../grammar';

export class SymbolEntry {
  readonly node: DeclarationNode;

  readonly scope: Scope;

  readonly refs: Node[] = [];

  private type?: SymbolType;

  constructor(node: DeclarationNode, scope: Scope) {
    this.node = node;
    this.scope = scope;
  }

  getType(): SymbolType {
    if (this.type) {
      return this.type;
    }

    throw new Error('Type is not set');
  }

  setType(type: SymbolType): void {
    if (this.type) {
      throw new Error('Can not change type');
    }

    this.type = type;
  }

  hasType(): boolean {
    return !!this.type;
  }
}
