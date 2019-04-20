import { Token, TokenMatcher, TokenClass } from '../token';

interface AnalyzerListener {
  token: TokenClass | TokenMatcher;
  enter?(token: Token, context?);
  exit?(token: Token, context?);
}

export default AnalyzerListener;
