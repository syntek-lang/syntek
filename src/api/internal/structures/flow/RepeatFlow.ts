import Flow from './Flow';
import Struct from '../struct/Struct';
import Context from '../context/Context';

export default class RepeatFlow implements Flow {
  constructor(context: Context, amount: Struct, body: (this: Context) => void) {
    for (let i = 0; i < amount.toNumber(); i += 1) {
      body.call(context);
    }
  }
}
