/* eslint-disable import/first, import/newline-after-import */

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';
console.log(program);

// Parsing
import { Tokenizer, Parser } from './parser';
export const tokenResult = new Tokenizer(program).tokenize();
console.log(tokenResult);

export const parseResult = new Parser(tokenResult.tokens).parse();
console.log(parseResult);

// Semantic analysis
import { Linter } from './linter';
import * as lintParser from './linter/rules/parser';

console.log(new Linter(
  parseResult.ast,
  lintParser,
).lint());

// Scopes
import { BlockScope } from './scope';

console.log(new BlockScope(parseResult.ast));

// Export everything
export const code = program;
export * from './diagnostic';
export * from './grammar';
export * from './linter';
export * from './parser';
export * from './position';
export * from './scope';
export * from './walker';
