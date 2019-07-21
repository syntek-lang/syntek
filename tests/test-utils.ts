import { join } from 'path';
import { readFileSync, readdirSync, lstatSync } from 'fs';

import { Program } from '../src/grammar/nodes/Other';

import { Tokenizer } from '../src/compiler/parser/Tokenizer';
import { Parser } from '../src/compiler/parser/Parser';
import { YamlHandler } from '../src/i18n/YamlHandler';
import { Token } from '../src/grammar/Token';

export function loadRaw(base: string, path: string): string {
  const fullPath = join(base, path);
  const content = readFileSync(fullPath);
  return content.toString();
}

const messages = new YamlHandler(loadRaw(__dirname, '../src/i18n/messages.yaml'));

export function tokenize(code: string): Token[] {
  const tokenizer = new Tokenizer(code);
  const result = tokenizer.tokenize();

  if (result.diagnostics.length) {
    result.diagnostics.forEach((diagnostic) => {
      console.error(messages.parse(diagnostic.msgKey, {}));
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
      console.error(messages.parse(diagnostic.msgKey, {}));
    });

    process.exit(1);
  }

  return parsed.ast;
}

export function loadTestsInDir(base: string, path: string): void {
  const fullPath = join(base, path);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
