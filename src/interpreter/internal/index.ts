/* eslint-disable func-names */

import * as s from './structures';

console.warn('Interpreter start');

const context = new s.DefaultContext();
context.declare('print', s.FunctionStruct, new s.FunctionStruct(context, [{ type: null, name: 'param' }], function () {
  console.log(this.get('param'));
}));

context.declare('main', s.FunctionStruct, new s.FunctionStruct(context, [], function () {
  this.declare('x', s.StringLiteral, new s.StringLiteral('Hello'));
  this.declare('x', null, new s.StringLiteral('Hello, World!'));

  this.get('print').exec([this.get('x')]);
}));

console.log(context.get('main').exec([]));
console.log(s);

console.warn('Interpreter end');
