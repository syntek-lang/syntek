import ObjectStruct from './structures/struct/ObjectStruct';

const parent1 = new ObjectStruct(undefined, undefined);

const parent2 = new ObjectStruct(parent1, undefined);
parent1.child = parent2;

const child = new ObjectStruct(parent2, undefined);
parent2.child = child;

child.setProperty('y', new ObjectStruct(undefined, undefined));

parent1.getProperty('x');
