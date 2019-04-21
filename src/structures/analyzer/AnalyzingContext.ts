import { Token } from '../token';

import AnalyzingReport from './AnalyzingReport';

export default class AnalyzingContext {
  readonly ancestors: Token[];

  readonly reports: AnalyzingReport[] = [];

  constructor(ancestors: Token[]) {
    this.ancestors = ancestors;
  }

  report(report: AnalyzingReport): void {
    this.reports.push(report);
  }
}
