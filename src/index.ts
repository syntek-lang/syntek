import { Tokenizer, Parser } from './parser';

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';

console.log(program);

export const tokenResult = new Tokenizer(program).tokenize();
console.log(tokenResult);

export const parseResult = new Parser(tokenResult.tokens).parse();
console.log(parseResult);

export const code = program;
export * from './analyzer';
export * from './diagnostic';
export * from './grammar';
export * from './linter';
export * from './parser';
export * from './position';
export * from './walker';

// TODO: Semantic analysis
