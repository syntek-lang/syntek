import { Node } from '../../grammar';

export abstract class Type {
  readonly node: Node;

  constructor(node: Node) {
    this.node = node;
  }

  abstract matches(type: Type): boolean;
}
