import { Level } from '.';
import { Span } from '../position';

export class Diagnostic {
  readonly level: Level;

  readonly msgKey: string;

  readonly location: Span;

  constructor(level: Level, msgKey: string, location: Span) {
    this.level = level;
    this.msgKey = msgKey;
    this.location = location;
  }
}
