import { Scope } from '../..';
import { FunctionDeclaration } from '../../../grammar';

export class FunctionScope extends Scope {
  readonly node: FunctionDeclaration;

  constructor(node: FunctionDeclaration, parent?: Scope) {
    super(node, parent);

    this.node = node;
  }

  build(): void {
    this.node.body.forEach(child => this.handleNode(child));

    this.buildScopes();
  }
}
