/* eslint-disable func-names, no-new */

import * as s from './structures';

console.warn('Interpreter start');

const context = new s.DefaultContext();
context.declare('print', new s.FunctionStruct(context, ['param'], function () {
  console.log(this.get('param'));
}));

context.declare('main', new s.FunctionStruct(context, [], function () {
  this.declare('fruits', new s.ArrayLiteral([
    new s.StringLiteral('banana'),
    new s.StringLiteral('apple'),
    new s.StringLiteral('mango'),
  ]));

  new s.ForFlow(this, 'fruit', this.get('fruits'), function () {
    this.get('print').exec([this.get('fruit')]);
  });
  if (this.hasReturn) return;

  this.get('print').exec([new s.StringLiteral('After the loop')]);
}));

console.log(context.get('main').exec([]));
console.log(s);

console.warn('Interpreter end');
