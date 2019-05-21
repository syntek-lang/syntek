/* eslint-disable func-names, prefer-arrow-callback */

import DefaultContext from './structures/context/DefaultContext';
import FunctionStruct from './structures/struct/FunctionStruct';
import ObjectStruct from './structures/struct/ObjectStruct';

import * as literals from './structures/struct/literals';

console.warn('Interpreter start');

const context = new DefaultContext();
context.declare('context', new ObjectStruct(context, function () {}));

const func = new FunctionStruct(context, [], function () {
  console.log(this);
  return new literals.NullLiteral();
});

console.log(func);
console.log(literals);

console.warn('Interpreter end');
