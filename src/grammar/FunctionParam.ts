import { Identifier, VariableType } from '.';

export interface FunctionParam {
  name: Identifier;
  variableType: VariableType | null;
}
