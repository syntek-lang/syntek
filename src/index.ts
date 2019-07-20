import { Tokenizer, Parser } from './compiler';

import messages from './i18n/messages.yaml';
import { YamlHandler } from './i18n/YamlHandler';

// import program from '../tests/syntek/programs/fizzbuzz.tek';
import program from './dev.tek';

export const yaml = new YamlHandler(messages);

console.log(program);

export const tokenResult = new Tokenizer(program).tokenize();
console.log(tokenResult);

export const parseResult = new Parser(tokenResult.tokens).parse();
console.log(parseResult);

export * from './compiler';
export * from './grammar';
