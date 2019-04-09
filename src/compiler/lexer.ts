import Utils from '../utils';

interface TokenMatch {
  name: string;
  index: number;
  raw: string;
}

export default function lexer(input: string, matchers): TokenMatch[] {
  const tokens: TokenMatch[] = [];
  let index = 0;

  let previousIndent = Utils.getIndent(input, 1);

  while (index < input.length) {
    const { line, row } = Utils.lineRow(input, index);
    let matched = false;

    for (const name of Object.keys(matchers)) {
      const regex = matchers[name] as RegExp;
      const match = input.slice(index).match(regex);

      if (match) {
        const currentIndent = Utils.getIndent(input, line);

        if (currentIndent > previousIndent) {
          tokens.push(
            ...Utils.createArray(currentIndent - previousIndent).map(() => ({ name: 'indent', index, raw: '\t' })),
          );
        } else if (currentIndent < previousIndent) {
          tokens.push(
            ...Utils.createArray(previousIndent - currentIndent).map(() => ({ name: 'outdent', index, raw: '' })),
          );
        }

        previousIndent = currentIndent;

        // TODO: Make this not hardcoded
        if (name !== 'tab' && name !== 'space') {
          tokens.push({ name, index, raw: match[0] });
        }

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
    ...Utils.createArray(previousIndent).map(() => ({ name: 'outdent', index, raw: '' })),
  );

  return tokens;
}
