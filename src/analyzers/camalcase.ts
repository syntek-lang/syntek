import Analyzer from '../structures/analyzer/Analyzer';

import tokens from '../tokens/all';

export default new Analyzer([
  {
    token: tokens.Symbol,
    enter(token) {
      console.log(token);
    },
  },
]);
