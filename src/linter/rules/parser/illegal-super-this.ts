import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

export const illegalSuperThis: LinterRule = {
  description: 'Report this and super usage outside of a class',
  level: Level.ERROR,
  create(walker, report) {
    function inClass(parents: grammar.Node[]): boolean {
      return parents.some(parent => parent.type === grammar.SyntacticToken.CLASS_DECL);
    }

    walker.onEnter(grammar.Super, (node, _, parents) => {
      if (!inClass(parents)) {
        report('You can only use super inside a class', node.span);
      }
    });

    walker.onEnter(grammar.MemberExpression, (node, _, parents) => {
      if (node.property.type === grammar.LexicalToken.SUPER && !inClass(parents)) {
        report('You can only use super inside a class', node.span);
      }
    });

    walker.onEnter(grammar.This, (node, _, parents) => {
      if (!inClass(parents)) {
        report('You can only use this inside a class', node.span);
      }
    });
  },
};
