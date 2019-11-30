import { Type } from './Type';
import { Node } from '../../grammar';

export class ObjectType extends Type {
  readonly generics: Type[];

  constructor(generics: Type[], node: Node) {
    super(node);

    this.generics = generics;
  }

  matches(): boolean {
    // TODO: check type and generics
    return false;
  }
}
