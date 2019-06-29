import { tokenize, parse } from './compiler';

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';

const tokenResult = tokenize(program);
console.log(tokenResult);

const ast = parse(tokenResult.tokens);
console.log(ast);
