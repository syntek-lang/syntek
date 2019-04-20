import * as treeify from 'treeify';

import Utils from './utils';

import lexer from './compiler/lexer';
import parser from './compiler/parser';

import lexingTokens from './tokens/lexing';
import parsingTokens from './tokens/parsing';

import * as tests from './tests';

console.log(lexingTokens);
console.log(parsingTokens);

const input = tests.correct.calculator;
const fileName = 'test';

(document.getElementById('input') as HTMLElement).innerText = input;

const lexed = lexer(input, fileName);
console.log(lexed);
(document.getElementById('tokens') as HTMLElement).innerText = lexed
  .map(token => `${Utils.padRight(token.location.start, 4)} - ${Utils.padRight(token.name, 15)} - ${token.raw.replace(/\n/g, '')}`)
  .join('\n');

const parsed = parser(lexed
  .filter(token => !(token instanceof lexingTokens.Space.Class))
  .filter(token => !(token instanceof lexingTokens.Tab.Class))
  .filter(token => !(token instanceof lexingTokens.Newline.Class))
  .filter(token => !(token instanceof lexingTokens.Emptyline.Class)), fileName);
console.log(parsed);

// Copy the AST so we can still use index and tokens
const parsedCopy = JSON.parse(JSON.stringify(parsed));
Utils.removeProps(parsedCopy, ['location', 'tokens']);
(document.getElementById('tree') as HTMLElement).innerText = treeify.asTree(parsedCopy, true, true);
