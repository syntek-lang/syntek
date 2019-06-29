import { tokenize, parse } from './compiler';

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';

console.log(program);

export const tokenResult = tokenize(program);
console.log(tokenResult);

export const ast = parse(tokenResult.tokens);
console.log(ast);

export * from './compiler';
