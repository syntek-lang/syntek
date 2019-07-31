import { Tokenizer, Parser } from './compiler';

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';

console.log(program);

export const tokenResult = new Tokenizer(program).tokenize();
console.log(tokenResult);

export const parseResult = new Parser(tokenResult.tokens).parse();
console.log(parseResult);

export * from './compiler';
export * from './diagnostic';
export * from './grammar';
export * from './position';
export * from './walker';
