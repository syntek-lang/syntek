import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

export class Symbol extends Literal {}

export const SymbolMatcher = new TokenMatcher(Symbol, /^[a-zA-Z_]\w*/);
