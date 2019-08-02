import { Tokenizer, Parser } from './compiler';
import { DeclarationFinder } from './compiler/analyzer/DeclarationFinder';

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';

console.log(program);

export const tokenResult = new Tokenizer(program).tokenize();
console.log(tokenResult);

export const parseResult = new Parser(tokenResult.tokens).parse();
console.log(parseResult);

export const code = program;
export * from './compiler';
export * from './diagnostic';
export * from './grammar';
export * from './position';
export * from './walker';

// Semantic analysis
export const fileScope = new DeclarationFinder(parseResult.ast).search();
console.log(fileScope);
