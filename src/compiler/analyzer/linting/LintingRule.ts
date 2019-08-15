import { Span } from '../../../position';
import { ASTWalker } from '../../../walker';
import { Level, Diagnostic } from '../../../diagnostic';

export type ReportFunction = (
  msg: string,
  span: Span,
  errorHandler?: (error: Diagnostic) => void
) => void;

export interface LintingRule {
  name: string;
  description: string;
  level: Level;
  create(walker: ASTWalker, report: ReportFunction): void;
}
