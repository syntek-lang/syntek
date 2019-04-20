import Analyzer from '../structures/analyzer/Analyzer';

import tokens from '../tokens/all';

export default new Analyzer([
  {
    token: tokens.FunctionDeclaration,
    enter(token) {
      console.log('Enter', token);
    },
    exit(token) {
      console.log('Exit', token);
    },
  },
]);
