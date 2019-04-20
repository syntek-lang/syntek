import Analyzer from '../structures/analyzer/Analyzer';

import { FunctionDeclaration } from '../tokens/parsing/declarations/FunctionDeclaration';

export default new Analyzer([
  {
    token: FunctionDeclaration,
    enter(token: FunctionDeclaration, context) {
      const nestedFunction = context
        .ancestors
        .some(ancestor => ancestor instanceof FunctionDeclaration);

      if (nestedFunction) {
        console.log(`You declared function '${token.id.raw}' inside another function, which is not allowed`);
      }
    },
  },
]);
