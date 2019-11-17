import { Node, InstanceofExpression } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

import { matchTypeDecl } from '../../parse-utils';

export function instanceofExpr(parser: Parser, left: Node): Node {
  parser.ignoreNewline();

  const right = matchTypeDecl(parser);

  return new InstanceofExpression(left, right, new Span(left.span.start, right.span.end));
}
