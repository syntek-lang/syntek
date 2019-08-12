import * as grammar from '../../../../../grammar';

import { LintingRule } from '../..';
import { Level } from '../../../../../diagnostic';

export const variableCasing: LintingRule = {
  name: 'variable-casing',
  description: 'Report incorrect variable casing',
  level: Level.WARN,
  create(walker, report) {
    walker.onEnter(grammar.VariableDeclaration, (node) => {
      const name = node.identifier.lexeme.replace(/^_+|_+$/g, '');

      if (name.indexOf('_') < 0 || name === name.toUpperCase()) {
        return;
      }

      report(node.span, 'Variable names should be camelCase or all caps');
    });
  },
};
