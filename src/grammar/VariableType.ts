import { Identifier } from '.';
import { Span } from '../position';

export interface VariableType {
  // TODO: possibly work something out for 'any' ending up as an identifier now
  type: Identifier;
  arrayDepth: number;
  span: Span;
}
