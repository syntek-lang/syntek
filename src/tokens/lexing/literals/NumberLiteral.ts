import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

class NumberLiteral extends Literal {}

export default new TokenMatcher(NumberLiteral, /^(0|-?[1-9][0-9]*)([.,][0-9]+)?/);
