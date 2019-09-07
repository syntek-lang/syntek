import { Level } from '.';
import { Span } from '../position';
import { SubDiagnostic } from './SubDiagnostic';

export class Diagnostic {
  readonly level: Level;

  readonly name: string;

  readonly msg: string;

  readonly span: Span;

  readonly children: SubDiagnostic[] = [];

  constructor(level: Level, name: string, msg: string, span: Span) {
    this.level = level;
    this.name = name;
    this.msg = msg;
    this.span = span;
  }

  info(msg: string, span: Span): Diagnostic {
    return this.sub(Level.INFO, msg, span);
  }

  warn(msg: string, span: Span): Diagnostic {
    return this.sub(Level.WARN, msg, span);
  }

  error(msg: string, span: Span): Diagnostic {
    return this.sub(Level.ERROR, msg, span);
  }

  private sub(level: Level, msg: string, span: Span): Diagnostic {
    this.children.push(new SubDiagnostic(level, msg, span));
    return this;
  }
}
