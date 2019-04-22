import { Token } from '../token';

import AnalyzingReport from './AnalyzingReport';
import SymbolTable from './SymbolTable';

export default class AnalyzingContext {
  /**
   * The ancestors of the token currently being analyzed
   */
  readonly ancestors: Token[];

  /**
   * The symbol table of the program with all known variables
   */
  readonly symbolTable: SymbolTable;

  /**
   * The reports made during analyzing the current token
   */
  readonly reports: AnalyzingReport[] = [];

  /**
   * Create a new analyzing context
   *
   * @param ancestors - The ancestors of the token currently being analyzed
   * @param symbolTable - The symbol table of the program with all known variables
   */
  constructor(ancestors: Token[], symbolTable: SymbolTable) {
    this.ancestors = ancestors;
    this.symbolTable = symbolTable;
  }

  /**
   * Report an issue
   *
   * @param report - The report information
   */
  report(report: AnalyzingReport): void {
    this.reports.push(report);
  }
}
