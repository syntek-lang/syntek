/* eslint-disable func-names */

import * as s from './structures';

console.warn('Interpreter start');

const context = new s.DefaultContext();
context.declare('print', s.FunctionStruct, new s.FunctionStruct(context, [{ type: null, name: 'param' }], function () {
  console.log(this.get('param'));
}));

context.declare('MyClass', s.ClassStruct, new s.ClassStruct(context, 'MyClass', (() => {}), function () {
  this.declare('MyClass', s.FunctionStruct, new s.FunctionStruct(this, [], function () {
    console.log('Constructor', this);
  }));
}));

console.log(context.get('MyClass').createNew([]));
console.log(s);

console.warn('Interpreter end');
