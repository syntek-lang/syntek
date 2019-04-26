import NumberStruct from '../structures/NumberStruct';

export default class LiteralHandler {
  number(value: number) {
    return new NumberStruct(value);
  }
}
