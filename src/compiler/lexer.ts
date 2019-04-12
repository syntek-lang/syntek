import { Token, TokenMatcher } from '../structures';
import Utils from '../utils';

import tokenMatchers from '../tokens';

import Indent from '../tokens/Indent';
import Outdent from '../tokens/Outdent';

// Remove the __esModule property, we don't need it
delete (tokenMatchers as any).__esModule; // eslint-disable-line no-underscore-dangle

export default function lexer(input: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  let previousIndent = Utils.getIndent(input, 1);

  while (index < input.length) {
    const { line, row } = Utils.lineRow(input, index);
    let matched = false;

    for (const name of Object.keys(tokenMatchers)) {
      const tokenMatcher = tokenMatchers[name] as TokenMatcher;
      const match = input.slice(index).match(tokenMatcher.regex);

      if (match) {
        const currentIndent = Utils.getIndent(input, line);

        if (currentIndent > previousIndent) {
          tokens.push(
            ...Utils.createArray(currentIndent - previousIndent).map(() => new Indent(index, '\t')),
          );
        } else if (currentIndent < previousIndent) {
          tokens.push(
            ...Utils.createArray(previousIndent - currentIndent).map(() => new Outdent(index, '')),
          );
        }

        previousIndent = currentIndent;

        tokens.push(new tokenMatcher.Class(index, match[0]));

        index += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unknown token ${input.slice(index, index + 1)} at ${line}:${row}`);
    }
  }

  tokens.push(
    ...Utils.createArray(previousIndent).map(() => new Outdent(index, '')),
  );

  return tokens;
}
