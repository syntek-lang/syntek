import Utils from './utils';
import tokens from './tokens';
import lexer from './compiler/lexer';

// Remove the __esModule property, we don't need it
delete (tokens as any).__esModule; // eslint-disable-line no-underscore-dangle
console.log(tokens);

const input = `function multiply(a, b)
\tsum = 0
\trepeat b times
\t\tsum = sum + a
\treturn sum

function pow(base, exponent)
\tsum = base
\trepeat exponent - 1 times
\t\tsum = multiply(sum, base)
\treturn sum`;
(document.getElementById('input') as HTMLElement).innerText = input;

const lexed = lexer(input, tokens);
console.log(lexed);
(document.getElementById('tokens') as HTMLElement).innerText = lexed
  .filter(token => token.name !== 'Tab' && token.name !== 'Space')
  .map(token => `${Utils.padRight(token.index, 4)} - ${Utils.padRight(token.name, 10)} - ${token.raw.replace(/\n/, '')}`)
  .join('\n');
