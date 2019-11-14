import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { StaticScope } from './StaticScope';
import { SymbolTable } from '../symbols/SymbolTable';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class ClassScope extends Scope<grammar.ClassDeclaration> {
  readonly staticScope: StaticScope;

  readonly generics = new SymbolTable();

  constructor(node: grammar.ClassDeclaration, parent?: Scope) {
    super(node, parent);

    this.staticScope = new StaticScope(node, parent);
    this.staticScope.build();
  }

  getSymbol(name: string): SymbolEntry {
    const generic = this.generics.get(name);
    if (generic) {
      return generic;
    }

    if (this.parent) {
      return this.parent.getSymbol(name);
    }

    throw new Error(`No symbol with the name ${name}`);
  }

  hasSymbol(name: string): boolean {
    if (this.generics.has(name)) {
      return true;
    }

    if (this.parent) {
      return this.parent.hasSymbol(name);
    }

    return false;
  }

  hasFunction(name: string): boolean {
    if (this.parent) {
      return this.parent.hasFunction(name);
    }

    return false;
  }

  build(): void {
    this.node.genericParams.forEach((generic) => {
      const entry = new SymbolEntry(generic, this);

      // Generics are stored in the general table, and a map for generics, because
      // a generic can be acquired directly
      this.table.add(generic.identifier.lexeme, entry);
      this.generics.add(generic.identifier.lexeme, entry);
    });

    this.node.instanceBody.forEach(prop => this.add(prop.value));
  }
}
