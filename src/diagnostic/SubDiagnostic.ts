import { Level } from '.';
import { Span } from '../position';

export class SubDiagnostic {
  readonly level: Level;

  readonly msg: string;

  readonly span: Span;

  constructor(level: Level, msg: string, span: Span) {
    this.level = level;
    this.msg = msg;
    this.span = span;
  }
}
