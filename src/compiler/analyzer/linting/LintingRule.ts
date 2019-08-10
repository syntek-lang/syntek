import { LintingCategory } from '.';
import { ASTWalker } from '../../../walker';

export interface LintingRule {
  name: string;
  description: string;
  category: LintingCategory;
  create(walker: ASTWalker): void;
}
