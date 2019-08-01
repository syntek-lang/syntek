import { Node } from '../../../grammar';

export abstract class Scope {
  readonly imports: Node[] = [];

  readonly classes: Node[] = [];

  readonly variables: Node[] = [];

  readonly functions: Node[] = [];
}
