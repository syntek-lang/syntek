/* eslint-disable @typescript-eslint/no-require-imports */

import { join } from 'path';
import { readFileSync, readdirSync, lstatSync } from 'fs';

import { Program } from '../src/grammar/nodes/Other';
import { tokenize } from '../src/compiler/parser/tokenizer';
import { Parser } from '../src/compiler/parser/Parser';

export function loadRaw(base: string, path: string): string {
  const fullPath = join(base, path);
  const content = readFileSync(fullPath);
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

export function loadTestsInDir(base: string, path: string): void {
  const fullPath = join(base, path);

  readdirSync(fullPath)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
    .map(file => join(fullPath, file))
    .filter(file => lstatSync(file).isFile())
    .forEach(require);
}

export function getDirsFrom(base: string, path: string): string[] {
  const fullPath = join(base, path);

  return readdirSync(fullPath)
    .filter(file => lstatSync(join(fullPath, file)).isDirectory())
    .map(file => join(path, file));
}
