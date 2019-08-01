/* eslint-disable eslint-comments/no-unlimited-disable */

import { join } from 'path';
import { readFileSync, readdirSync, lstatSync } from 'fs';

import { Program } from '../src/grammar/nodes/Other';

import { Tokenizer } from '../src/compiler/parser/Tokenizer';
import { Parser } from '../src/compiler/parser/Parser';
import { Token } from '../src/grammar/Token';

export function loadRaw(base: string, path: string): string {
  const fullPath = join(base, path);
  const content = readFileSync(fullPath);
  return content.toString();
}

export function tokenize(code: string): Token[] {
  const tokenizer = new Tokenizer(code);
  const result = tokenizer.tokenize();

  if (result.diagnostics.length) {
    result.diagnostics.forEach((diagnostic) => {
      console.error(diagnostic.msg);
    });

    process.exit(1);
  }

  return result.tokens;
}

export function parse(code: string): Program {
  const tokens = tokenize(code);

  const parser = new Parser(tokens);
  const parsed = parser.parse();

  if (parsed.diagnostics.length) {
    parsed.diagnostics.forEach((diagnostic) => {
      console.error(diagnostic.msg);
    });

    process.exit(1);
  }

  return parsed.ast;
}

export function loadIndexInDir(base: string, dir: string): void {
  const path = join(base, dir);

  const index = readdirSync(path).find(file => /index(?:\.test)?\.(?:ts|js)/.test(file));
  if (index) {
    require(join(path, index)); // eslint-disable-line
  } else {
    throw new Error('No index file found');
  }
}

export function loadTestsInDir(base: string, dir: string): void {
  const path = join(base, dir);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  readdirSync(path)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
    .map(file => join(path, file))
    .filter(file => lstatSync(file).isFile())
    .forEach(require);
}

export function getDirsFrom(base: string, dir: string): string[] {
  const path = join(base, dir);

  return readdirSync(path)
    .filter(file => lstatSync(join(path, file)).isDirectory())
    .map(file => join(dir, file));
}
