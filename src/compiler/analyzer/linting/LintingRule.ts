import { Span } from '../../../position';
import { Level } from '../../../diagnostic';
import { ASTWalker } from '../../../walker';

export type ReportFunction = (span: Span, msg: string) => void;

export interface LintingRule {
  name: string;
  description: string;
  level: Level;
  create(walker: ASTWalker, report: ReportFunction): void;
}
