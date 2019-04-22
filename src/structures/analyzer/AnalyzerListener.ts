import { Token, TokenMatcher, TokenClass } from '../token';
import AnalyzingContext from './AnalyzingContext';

interface AnalyzerListener {
  /**
   * The token to listen for
   */
  token: TokenClass | TokenMatcher;

  /**
   * The callback that needs to be executed when the token is entered
   *
   * @param token - The token that is being analyzed
   * @param context - The context for analyzing the token
   */
  enter?(token: Token, context: AnalyzingContext): void;

  /**
   * The callback that needs to be executed when the token is exited
   *
   * @param token - The token that is being analyzed
   * @param context - The context for analyzing the token
   */
  exit?(token: Token, context: AnalyzingContext): void;
}

export default AnalyzerListener;
