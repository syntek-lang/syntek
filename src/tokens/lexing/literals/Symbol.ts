import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

export class Symbol extends Literal {
  /**
   * The name of the identifier of the declaration
   */
  readonly id = this.raw;
}

export const SymbolMatcher = new TokenMatcher(Symbol, /^[a-zA-Z_]\w*/);
