import Flow from './Flow';
import Struct from '../struct/Struct';
import Context from '../context/Context';
import { VoidContextCallback } from '../ParameterTypes';

export default class RepeatFlow implements Flow {
  constructor(context: Context, amount: Struct, body: VoidContextCallback) {
    for (let i = 0; i < amount.toNumber(); i += 1) {
      body.call(context);
    }
  }
}
