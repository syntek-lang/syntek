import { Type } from './Type';
import { Node } from '../../grammar';

export class ArrayType extends Type {
  readonly content: Type;

  constructor(content: Type, node: Node) {
    super(node);

    this.content = content;
  }

  matches(type: Type): boolean {
    return type instanceof ArrayType && type.content.matches(this.content);
  }
}
