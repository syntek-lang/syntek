import { Token } from '.';

export interface VariableType {
  type: Token | null;
  arrayDepth: number;
}
