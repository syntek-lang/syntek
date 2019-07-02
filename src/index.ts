import { tokenize, Parser } from './compiler';

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';

console.log(program);

export const tokenResult = tokenize(program);
console.log(tokenResult);

export const ast = new Parser(tokenResult.tokens).parse();
console.log(ast);

export * from './compiler';
