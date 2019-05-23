import Struct from '../struct/Struct';
import Context from '../context/Context';
import { NumberLiteral } from '../struct/literals';

export default class RepeatFlow {
  constructor(context: Context, amount: Struct, body: (this: Context) => void) {
    if (!(amount instanceof NumberLiteral)) {
      throw new Error('Amount must be a number');
    }

    for (let i = 0; i < amount.value; i += 1) {
      body.call(context);
    }
  }
}
