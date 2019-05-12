/* eslint-disable func-names, prefer-arrow-callback */

import DefaultContext from './structures/context/DefaultContext';
import ClassStruct from './structures/struct/ClassStruct';
import ObjectStruct from './structures/struct/ObjectStruct';

console.warn('Interpreter start');

const context = new DefaultContext();
context.declare('context', new ObjectStruct(context, function () {}));

const myClass = new ClassStruct(context, function () {
  this.declare('x', new ObjectStruct(this, function () {}));
}, function () {});

console.log(myClass);

console.warn('Interpreter end');
