import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

class SymbolLiteral extends Literal {}

export default new TokenMatcher(SymbolLiteral, /^[a-zA-Z_]\w*/);
