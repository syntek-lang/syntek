import Interpreter from '../internal/Interpreter';
import Context from '../internal/structures/context/Context';

import globals from './globals';

export const interpreter = new Interpreter();

globals(interpreter);

export function run(code: string): void {
  // eslint-disable-next-line no-new-func
  const body = new Function('i', 's', code) as (this: Context, i: Interpreter, s) => void;

  interpreter.run(body);
}
