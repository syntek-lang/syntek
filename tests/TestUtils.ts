import { join } from 'path';
import { readFileSync } from 'fs';

import { Program } from '../src/grammar/nodes/Other';
import { tokenize } from '../src/compiler/parser/tokenizer';
import { Parser } from '../src/compiler/parser/Parser';

export function loadRaw(dirname: string, filename: string): string {
  const path = join(dirname, filename);
  const content = readFileSync(path);
  return content.toString();
}

export function parse(code: string): Program {
  const tokens = tokenize(code);

  if (tokens.errors.length) {
    tokens.errors.forEach((token) => {
      console.error(`Unexpected token "${token.string}" at ${token.loc.start.join(':')}-${token.loc.end.join(':')}`);
    });

    process.exit(1);
  }

  const parser = new Parser(tokens.tokens);
  return parser.parse();
}
