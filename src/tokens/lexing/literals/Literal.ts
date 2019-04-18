import { Token } from '../../../structures/token';

abstract class Literal extends Token {
  build(): string {
    return this.raw;
  }
}

export default Literal;
