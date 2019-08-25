import { BlockScope, findReferences, Linter } from './analyzer';
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
export * from './parser';
export * from './position';
export * from './walker';

// Semantic analysis
export const programScope = new BlockScope(parseResult.ast);
programScope.build();
findReferences(parseResult.ast, programScope);
console.log(programScope);

console.log(new Linter(parseResult.ast).lint());
