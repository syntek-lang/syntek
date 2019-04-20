import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

export class StringLiteral extends Literal {}

export const StringLiteralMatcher = new TokenMatcher(StringLiteral, /^'(?:[^'\\]|\\.)*'/);
