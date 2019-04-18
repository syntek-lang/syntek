import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

class StringLiteral extends Literal {}

export default new TokenMatcher(StringLiteral, /^'(?:[^'\\]|\\.)*'/);
