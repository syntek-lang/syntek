/* eslint-disable func-names, no-new */

import * as s from './structures';

console.warn('Interpreter start');

const context = new s.DefaultContext();
context.declare('print', new s.FunctionStruct(context, ['param'], function () {
  console.log(this.get('param'));
  return new s.NullLiteral();
}));

context.declare('main', new s.FunctionStruct(context, [], function () {
  new s.RepeatFlow(this, new s.NumberLiteral(5), function () {
    this.get('print').exec([new s.StringLiteral('Hello, World!')]);
    return this.return(new s.StringLiteral('Return value'));
  });
  if (this.hasReturn) return;

  this.get('print').exec([new s.StringLiteral('After the loop')]);
}));

console.log(context.get('main').exec([]));
console.log(s);

console.warn('Interpreter end');
