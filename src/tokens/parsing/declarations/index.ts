import { $ } from '../../../structures/rule';

import Declaration from './Declaration';

import FunctionDeclaration from './FunctionDeclaration';
import VariableDeclaration from './VariableDeclaration';

Declaration.setRule($.OR(
  FunctionDeclaration,
  VariableDeclaration,
));

export default {
  FunctionDeclaration,
  VariableDeclaration,
};
