import { NumberStruct } from '../structures';

export default class LiteralHandler {
  number(value: number) {
    return new NumberStruct(value);
  }
}
