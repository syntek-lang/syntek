import Token from './Token';

type TokenClass = new (index: number, content: string | Token | Token[]) => Token;

export default TokenClass;
