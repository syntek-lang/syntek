import analyzersObject from '../analyzers';

import { Token } from '../structures/token';
import Utils from '../utils';

const analyzers = Utils.objectValues(analyzersObject);

export default function analyzer(token: Token, ancestors: Token[] = []) {
  for (const analyzerRule of analyzers) {
    analyzerRule.run('enter', token, ancestors);
  }

  if (token.tokens) {
    for (const child of Utils.flatten(token.tokens)) {
      analyzer(child, [...ancestors, token]);
    }
  }

  for (const analyzerRule of analyzers) {
    analyzerRule.run('exit', token, ancestors);
  }
}
