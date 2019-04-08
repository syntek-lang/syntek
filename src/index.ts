import tokens from './tokens';
import lexer from './compiler/lexer';

console.log(tokens);

const lexed = lexer(`function factorial(x)
\tif x is 0
\t\t\t\treturn 1
\telse
\t\treturn x * factorial(x - 1)`, tokens);

function pad(input: any, length: number): string {
  input = input.toString(); // eslint-disable-line no-param-reassign

  while (input.length < length) {
    input += ' '; // eslint-disable-line no-param-reassign
  }

  return input;
}

const pre = document.createElement('pre');
pre.innerText = lexed
  .map(token => `${pad(token.index, 2)} - ${pad(token.name.toUpperCase(), 10)} - ${token.raw.replace(/\n/, '')}`)
  .join('\n');
document.body.appendChild(pre);
