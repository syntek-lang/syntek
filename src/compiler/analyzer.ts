import analyzersObject from '../analyzers';

import { Token } from '../structures/token';
import Utils from '../utils';
import Analyzer from '../structures/analyzer/Analyzer';
import AnalyzingContext from '../structures/analyzer/AnalyzingContext';

const analyzers = Utils.objectValues(analyzersObject);

export default function analyzer(token: Token, ancestors: Token[] = []) {
  const context = new AnalyzingContext(ancestors);

  for (const analyzerRule of analyzers) {
    (analyzerRule as Analyzer).run('enter', token, context);
  }

  if (token.tokens) {
    for (const child of Utils.flatten(token.tokens)) {
      analyzer(child, [...ancestors, token]);
    }
  }

  for (const analyzerRule of analyzers) {
    (analyzerRule as Analyzer).run('exit', token, context);
  }
}
