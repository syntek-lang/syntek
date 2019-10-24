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

  getSymbol(name: string): SymbolEntry | undefined {
    if (this.generics.has(name)) {
      return this.generics.get(name);
    }

    if (this.parent) {
      return this.parent.getSymbol(name);
    }

    return undefined;
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
      const entry = new SymbolEntry(this.node, this);

      // Generics are stored with the general symbols, and a map for generics, because
      // a generic can be acquired directly
      this.symbols.add(generic.lexeme, entry);
      this.generics.add(generic.lexeme, entry);
    });

    this.node.instanceBody.forEach(prop => this.add(prop.value));
  }
}
