import { Token, TokenMatcher, TokenClass } from '../token';
import AnalyzingContext from './AnalyzingContext';

interface AnalyzerListener {
  token: TokenClass | TokenMatcher;
  enter?(token: Token, context: AnalyzingContext);
  exit?(token: Token, context: AnalyzingContext);
}

export default AnalyzerListener;
