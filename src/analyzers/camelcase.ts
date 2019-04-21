import Analyzer from '../structures/analyzer/Analyzer';

import { Symbol } from '../tokens/lexing/literals/Symbol';

export default new Analyzer([
  {
    token: Symbol,
    enter(token: Symbol, context) {
      const name = token.raw.replace(/^_+|_+$/g, '');

      if (name.indexOf('_') < 0 || name === name.toUpperCase()) {
        return;
      }

      context.report({
        type: 'warn',
        message: `Symbol '${name}' contains underscores, but is not in all caps`,
        token,
      });
    },
  },
]);
