import { tokenize } from './compiler';

import fizzbuzz from '../tests/syntek/programs/fizzbuzz.tek';

const tokens = tokenize(fizzbuzz);
console.log(tokens);
