import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

export const illegalSuperThis: LinterRule = {
  description: 'Report this and super usage outside of a class',
  level: Level.ERROR,
  create(walker, report) {
    function getClassProp(parents: grammar.Node[]): grammar.ClassProp | undefined {
      for (let i = parents.length - 1; i >= 0; i -= 1) {
        if (parents[i].type === grammar.SyntacticToken.CLASS_PROP) {
          return parents[i] as grammar.ClassProp;
        }
      }

      return undefined;
    }

    walker.onEnter(grammar.Super, (node, ctx) => {
      const classProp = getClassProp(ctx.parents);

      if (!classProp) {
        report("You can only use 'super' inside a class", node.span);
        return;
      }

      if (classProp.static) {
        report("You can not use 'super' in a static variable or function", node.span);
      }
    });

    walker.onEnter(grammar.MemberExpression, (node, ctx) => {
      if (node.property.type !== grammar.LexicalToken.SUPER) {
        return;
      }

      const classProp = getClassProp(ctx.parents);

      if (!classProp) {
        report("You can only use 'super' inside a class", node.property.span);
        return;
      }

      if (classProp.static) {
        report("You can not use 'super' in a static variable or function", node.property.span);
      }
    });

    walker.onEnter(grammar.This, (node, ctx) => {
      const classProp = getClassProp(ctx.parents);

      if (!classProp) {
        report("You can only use 'this' inside a class", node.span);
        return;
      }

      if (classProp.static) {
        report("You can not use 'this' in a static variable or function", node.span);
      }
    });
  },
};
