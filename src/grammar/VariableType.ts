import { Token } from '.';
import { Span } from '../position';

export interface VariableType {
  type: Token;
  arrayDepth: number;
  span: Span;
}
