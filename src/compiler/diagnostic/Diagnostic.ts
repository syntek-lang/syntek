import { Level } from '..';
import { TokenLocation } from '../..';

export class Diagnostic {
  readonly level: Level;

  readonly msgKey: string;

  readonly location: TokenLocation;

  constructor(level: Level, msgKey: string, location: TokenLocation) {
    this.level = level;
    this.msgKey = msgKey;
    this.location = location;
  }
}
