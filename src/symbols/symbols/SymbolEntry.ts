import { Scope } from '../scopes/Scope';
import { SymbolType } from './SymbolType';
import {
  Node, DeclarationNode,
  FunctionDeclaration, EmptyFunctionDeclaration,
} from '../../grammar';

type Func = FunctionDeclaration | EmptyFunctionDeclaration;

export class SymbolEntry {
  readonly node: DeclarationNode;

  readonly scope: Scope;

  readonly refs: Node[] = [];

  private type?: SymbolType | Func;

  constructor(node: DeclarationNode, scope: Scope) {
    this.node = node;
    this.scope = scope;
  }

  getType(): SymbolType | Func {
    if (this.type) {
      return this.type;
    }

    throw new Error('Type is not set');
  }

  setType(type: SymbolType | Func): void {
    if (this.type) {
      throw new Error('Can not change type');
    }

    this.type = type;
  }

  hasType(): boolean {
    return !!this.type;
  }
}
