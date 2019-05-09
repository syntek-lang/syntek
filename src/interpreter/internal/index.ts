import ObjectStruct from './structures/struct/ObjectStruct';

console.warn('Interpreter start');

const parent1 = new ObjectStruct();

const parent2 = new ObjectStruct(parent1);
parent1.child = parent2;

const child = new ObjectStruct(parent2);
parent2.child = child;

child.declare('x', new ObjectStruct());

parent1.get('x');

console.warn('Interpreter end');
