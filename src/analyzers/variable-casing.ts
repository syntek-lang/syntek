import Analyzer from '../structures/analyzer/Analyzer';

import { VariableDeclaration } from '../tokens/parsing/declarations/VariableDeclaration';
import { ClassDeclaration } from '../tokens/parsing/declarations/ClassDeclaration';

export default new Analyzer([
  {
    token: VariableDeclaration,
    enter(token: VariableDeclaration, context) {
      const name = token.id.replace(/^_+|_+$/g, '');

      if (name.indexOf('_') < 0 || name === name.toUpperCase()) {
        return;
      }

      context.report({
        type: 'warn',
        message: 'Variables names can not contain underscores, unless in all caps',
        token: token.identifier,
      });
    },
  },
  {
    token: ClassDeclaration,
    enter(token: ClassDeclaration, context) {
      const name = token.id;

      if (/^[A-Z][a-zA-Z]*$/.test(name) && name !== name.toUpperCase()) {
        return;
      }

      context.report({
        type: 'warn',
        message: 'Class name should be PascalCase',
        token: token.identifier,
      });
    },
  },
]);
