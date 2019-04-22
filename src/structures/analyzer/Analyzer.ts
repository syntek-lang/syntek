import AnalyzerListener from './AnalyzerListener';
import AnalyzingContext from './AnalyzingContext';

import { Token, TokenMatcher } from '../token';

export default class Analyzer {
  /**
   * The listeners of the analyzer
   */
  readonly listeners: AnalyzerListener[];

  /**
   * Create a new analyzer
   *
   * @param listeners - The listeners of the analyzer
   */
  constructor(listeners: AnalyzerListener[]) {
    this.listeners = listeners;
  }

  /**
   * Analyze a token, executing the listeners for the token
   *
   * @param type - Either `enter` when the token is being entered,
   * or `exit` when the token is exited
   * @param token - The token that is being analyzed
   * @param context - The context for analyzing the token
   */
  run(type: 'enter' | 'exit', token: Token, context: AnalyzingContext): void {
    for (const listener of this.listeners) {
      let matches;

      if (listener.token instanceof TokenMatcher) {
        matches = token instanceof listener.token.Class;
      } else {
        matches = token instanceof listener.token;
      }

      if (matches) {
        if (type === 'enter' && listener.enter) {
          listener.enter(token, context);
        } else if (type === 'exit' && listener.exit) {
          listener.exit(token, context);
        }
      }
    }
  }
}
