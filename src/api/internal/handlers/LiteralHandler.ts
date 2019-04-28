import { Struct, NumberStruct, ObjectStruct } from '../structures';
import Context from './Context';

export default class LiteralHandler {
  number(value: number): Struct {
    return new NumberStruct(value);
  }

  object(context: Context, objectBuilder: (this: Context) => void): Struct {
    return new ObjectStruct(context, objectBuilder);
  }
}
