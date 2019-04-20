import { TokenMatcher } from '../../../structures/token';
import Literal from './Literal';

export class NumberLiteral extends Literal {}

export const NumberLiteralMatcher = new TokenMatcher(NumberLiteral, /^(0|-?[1-9][0-9]*)([.,][0-9]+)?/);
