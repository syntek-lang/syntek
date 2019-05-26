/* eslint-disable func-names */

import * as s from './structures';
import Interpreter from './Interpreter';

console.warn('Interpreter start');

const interpreter = new Interpreter();

interpreter.globalContext.declare('print', s.FunctionStruct, new s.FunctionStruct(interpreter.globalContext, [{ type: null, name: 'param' }], function () {
  console.log(this.get('param'));
}));

interpreter.run(function () {
  this.declare('MyClass', s.ClassStruct, new s.ClassStruct(this, 'MyClass', (() => {}), function () {
    this.declare('MyClass', s.FunctionStruct, new s.FunctionStruct(this, [], function () {
      console.log('Constructor', this);
    }));
  }));

  this.get('MyClass').createNew([]);
});

console.log(interpreter);
console.log(s);

console.warn('Interpreter end');
