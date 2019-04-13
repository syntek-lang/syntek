import Token from '../token/Token';

interface RuleResponse {
  matches: boolean,
  count: number,
  tokens: Token[] | Token,
  skip?: boolean,
}

export default RuleResponse;
