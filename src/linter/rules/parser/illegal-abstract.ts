import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

function isEmptyValue(node: grammar.Node): boolean {
  return node.type === grammar.SyntacticToken.EMPTY_FUNCTION_DECL
    || node.type === grammar.SyntacticToken.EMPTY_VARIABLE_DECL;
}

export const illegalAbstract: LinterRule = {
  description: 'Report illegal abstract properties',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.ClassDeclaration, (node) => {
      if (!node.abstract) {
        node.body.forEach((prop) => {
          if (prop.abstract) {
            report('Only abstract classes can contain abstract properties', prop.span);
          }
        });
      }

      node.body.forEach((prop) => {
        if (prop.abstract && !isEmptyValue(prop.value)) {
          report('An abstract property can not contain a value', prop.span);
        }
      });
    });
  },
};
