import { Scope } from './Scope';

export class FileScope extends Scope {
  getParent(): Scope {
    return this;
  }
}
