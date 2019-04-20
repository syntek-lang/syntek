import Analyzer from '../structures/analyzer/Analyzer';

import tokens from '../tokens/all';

export default new Analyzer([
  {
    token: tokens.Symbol,
    enter(_token) {
      // console.log(token);
    },
  },
]);
