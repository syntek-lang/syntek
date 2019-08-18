import { Identifier, MemberExpression } from '.';
import { Span } from '../position';

export interface VariableType {
  type: Identifier | MemberExpression;
  arrayDepth: number;
  span: Span;
}
