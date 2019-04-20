import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

export class BooleanLiteral extends Literal {}

export const BooleanLiteralMatcher = new TokenMatcher(BooleanLiteral, /^(true|false)(?!\w)/);
