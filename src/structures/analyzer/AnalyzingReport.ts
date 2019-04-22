import { Token } from '../token';

interface AnalyzingReport {
  /**
   * The type of the report
   */
  type: 'warn' | 'error';

  /**
   * Information about the report
   */
  message: string;

  /**
   * The token that is being reported on
   */
  token: Token;
}

export default AnalyzingReport;
