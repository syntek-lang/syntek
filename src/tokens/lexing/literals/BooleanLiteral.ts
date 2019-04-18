import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

class BooleanLiteral extends Literal {}

export default new TokenMatcher(BooleanLiteral, /^(true|false)(?!\w)/);
