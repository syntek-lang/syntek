import lexer from './compiler/lexer';
import parser from './compiler/parser';
import analyzer from './compiler/analyzer';

import lexingTokens from './tokens/lexing';
import Program from './tokens/parsing/Program';

import Utils from './utils';

export { default as lexer } from './compiler/lexer';
export { default as parser } from './compiler/parser';
export { default as analyzer } from './compiler/analyzer';
export * from './interpreter/external';

export function compile(code: string, file: string): string {
  const lexed = lexer(code, file);
  const parsed = parser(lexed
    .filter(token => !(token instanceof lexingTokens.Space))
    .filter(token => !(token instanceof lexingTokens.Tab))
    .filter(token => !(token instanceof lexingTokens.Newline))
    .filter(token => !(token instanceof lexingTokens.Emptyline)), file);

  analyzer(parsed as Program).forEach((report) => {
    const location = `${report.token.location.start}-${report.token.location.end}`;

    console[report.type](`${Utils.padRight(location, 8)} | ${report.message}`);
  });

  return (parsed as Program).build();
}
