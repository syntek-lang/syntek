import Token from './Token';
import Location from './Location';

type TokenClass = new (location: Location, rawOrTokens: string | Token[]) => Token;

export default TokenClass;
