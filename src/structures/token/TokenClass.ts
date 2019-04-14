import Token from './Token';

type TokenClass = new (indexOrTokens: number | Token | Token[], raw?: string) => Token;

export default TokenClass;
