import { Scope, SymbolEntry } from '../..';
import { FunctionDeclaration } from '../../../grammar';

export class FunctionScope extends Scope {
  readonly node: FunctionDeclaration;

  constructor(node: FunctionDeclaration, parent?: Scope) {
    super(node, parent);

    this.node = node;
  }

  build(): void {
    this.node.params.forEach((param) => {
      if (this.table.has(param.name.lexeme)) {
        throw new Error(`Parameter name "${param.name.lexeme}" of ${this.node.identifier.lexeme} already used`);
      } else {
        this.table.set(param.name.lexeme, new SymbolEntry(null, this));
      }
    });

    this.node.body.forEach(child => this.handleNode(child));

    this.buildScopes();
  }
}
