import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class StaticScope extends Scope<grammar.ClassDeclaration> {
  getSymbol(name: string): SymbolEntry | undefined {
    if (this.parent) {
      return this.parent.getSymbol(name);
    }

    return undefined;
  }

  hasSymbol(name: string): boolean {
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
    this.node.staticBody.forEach(prop => this.add(prop.value));
  }
}
