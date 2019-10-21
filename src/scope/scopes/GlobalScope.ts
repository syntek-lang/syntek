import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class GlobalScope extends Scope {
  constructor() {
    super(new grammar.NativeNode());

    this.build();
  }

  build(): void {
    this.symbols.add('Object', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Class', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Number', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('String', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Boolean', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Optional', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Array', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Function', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('VoidFunction', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Error', new SymbolEntry(new grammar.NativeNode(), this));
    this.symbols.add('Promise', new SymbolEntry(new grammar.NativeNode(), this));
  }
}
