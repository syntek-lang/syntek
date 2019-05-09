/* eslint-disable func-names */

import ClassStruct from './structures/struct/ClassStruct';
import ObjectStruct from './structures/struct/ObjectStruct';

console.warn('Interpreter start');

const myClass = new ClassStruct(function () {
  this.declare('x', new ObjectStruct());
});

console.log(myClass);

console.warn('Interpreter end');
