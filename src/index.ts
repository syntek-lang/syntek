import { Tokenizer, Parser } from './compiler';
import { findDeclarations } from './compiler/analyzer/declaration';

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

// Semantic analysis
const fileScope = findDeclarations(parseResult.ast);
console.log(fileScope);
