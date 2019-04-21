import AnalyzerListener from './AnalyzerListener';
import AnalyzingContext from './AnalyzingContext';

import { Token, TokenMatcher } from '../token';

export default class Analyzer {
  readonly listeners: AnalyzerListener[];

  constructor(listeners: AnalyzerListener[]) {
    this.listeners = listeners;
  }

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
