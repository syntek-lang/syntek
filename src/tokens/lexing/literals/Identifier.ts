import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

export class Identifier extends Literal {
  /**
   * The name of the identifier of the declaration
   */
  readonly id = this.raw;
}

export const SymbolMatcher = new TokenMatcher(Identifier, /^[a-zA-Z_]\w*/);
