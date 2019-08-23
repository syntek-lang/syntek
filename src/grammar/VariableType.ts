import { Identifier, MemberExpression } from '.';
import { Span } from '../position';

export interface VariableType {
  type: Identifier | MemberExpression;
  generics: VariableType[];
  arrayDepth: number;
  span: Span;
}
