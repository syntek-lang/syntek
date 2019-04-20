import { Token } from '../token';

export default class AnalyzingContext {
  readonly ancestors: Token[];

  constructor(ancestors: Token[]) {
    this.ancestors = ancestors;
  }

  report() {
    console.log('report');
  }
}
