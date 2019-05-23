/* eslint-disable func-names, no-new */

import DefaultContext from './structures/context/DefaultContext';
import FunctionStruct from './structures/struct/FunctionStruct';
import RepeatFlow from './structures/flow/RepeatFlow';

import * as literals from './structures/struct/literals';

console.warn('Interpreter start');

const context = new DefaultContext();
context.declare('print', new FunctionStruct(context, ['param'], function () {
  console.log(this.get('param'));
  return new literals.NullLiteral();
}));

context.declare('main', new FunctionStruct(context, [], function () {
  new RepeatFlow(this, new literals.NumberLiteral(5), function () {
    this.get('print').exec([new literals.StringLiteral('Hello, World!')]);
  });

  return new literals.NullLiteral();
}));

context.get('main').exec([]);
console.log(literals);

console.warn('Interpreter end');
