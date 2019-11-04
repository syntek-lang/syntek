import * as grammar from '../../grammar';

import { Scope } from './Scope';
import { Span } from '../../position';
import { SymbolEntry } from '../symbols/SymbolEntry';

export class GlobalScope extends Scope<grammar.NativeNode> {
  private static readonly span = new Span([0, 0], [0, 0])

  constructor() {
    super(new grammar.NativeNode(new grammar.Token(grammar.LexicalToken.NATIVE_TOKEN, 'GlobalScope', GlobalScope.span)));

    this.build();
  }

  build(): void {
    [
      // Functions
      'print',
      'range',

      // Classes
      'Object',
      'Number',
      'String',
      'Boolean',
      'Optional',
      'Array',
      'Function',
      'VoidFunction',
      'Error',
      'Promise',
    ].forEach((builtin) => {
      const identifier = new grammar.Token(
        grammar.LexicalToken.NATIVE_TOKEN,
        builtin,
        GlobalScope.span,
      );

      this.table.add(builtin, new SymbolEntry(new grammar.NativeNode(identifier), this));
    });
  }
}
