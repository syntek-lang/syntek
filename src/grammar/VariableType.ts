import { Token } from '.';

export type VariableType = {
  type: Token;
  arrayDepth: number;
} | null;
