import analyzersObject from '../analyzers';

import { Token } from '../structures/token';
import Utils from '../utils';

import Analyzer from '../structures/analyzer/Analyzer';
import AnalyzingContext from '../structures/analyzer/AnalyzingContext';
import AnalyzingReport from '../structures/analyzer/AnalyzingReport';

const analyzers: Analyzer[] = Utils.objectValues(analyzersObject);

export default function analyzer(token: Token, ancestors: Token[] = []): AnalyzingReport[] {
  const context = new AnalyzingContext(ancestors);

  for (const analyzerRule of analyzers) {
    analyzerRule.run('enter', token, context);
  }

  if (token.tokens) {
    for (const child of Utils.flatten(token.tokens)) {
      const reports = analyzer(child, [...ancestors, token]);
      reports.forEach(report => context.report(report));
    }
  }

  for (const analyzerRule of analyzers) {
    analyzerRule.run('exit', token, context);
  }

  return context.reports;
}
