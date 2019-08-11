import { Token, VariableType } from '.';

export interface FunctionParam {
  name: Token;
  variableType: VariableType | null;
}
