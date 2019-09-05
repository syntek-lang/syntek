import { ASTWalker } from '../walker';
import { Level, ReportFunction } from '../diagnostic';

export interface LinterRule {
  name: string;
  description: string;
  level: Level;
  create(walker: ASTWalker, report: ReportFunction): void;
}
