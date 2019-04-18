import Token from './Token';

type TokenClass = new (indexOrTokens: number | Token[], raw?: string) => Token;

export default TokenClass;
