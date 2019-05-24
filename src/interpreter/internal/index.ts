/* eslint-disable func-names, no-new */

import * as s from './structures';

console.warn('Interpreter start');

const context = new s.DefaultContext();
context.declare('print', new s.FunctionStruct(context, ['param'], function () {
  console.log(this.get('param'));
}));

context.declare('main', new s.FunctionStruct(context, [], function () {
  this.declare('x', new s.NumberLiteral(0));

  new s.WhileFlow(this, function () {
    return this.get('x').callMethod('$lt', [new s.NumberLiteral(5)]);
  }, function () {
    this.get('print').exec([new s.StringLiteral('Hello, World!')]);
    this.declare('x', this.get('x').callMethod('$add', [new s.NumberLiteral(1)]));
  });
  if (this.hasReturn) return;

  this.get('print').exec([new s.StringLiteral('After the loop')]);
}));

console.log(context.get('main').exec([]));
console.log(s);

console.warn('Interpreter end');
