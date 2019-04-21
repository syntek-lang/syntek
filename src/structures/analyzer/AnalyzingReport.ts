import { Token } from '../token';

interface AnalyzingReport {
  type: 'warn' | 'error';
  message: string;
  token: Token;
}

export default AnalyzingReport;
