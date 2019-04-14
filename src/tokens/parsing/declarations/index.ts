import { $ } from '../../../structures/rule';

import Declaration from './Declaration';

import FunctionDeclaration from './FunctionDeclaration';
import VariableDeclaration from './VariableDeclaration';
import ImportDeclaration from './ImportDeclaration';

Declaration.setRule($.OR(
  FunctionDeclaration,
  VariableDeclaration,
  ImportDeclaration,
));

export default {
  FunctionDeclaration,
  VariableDeclaration,
  ImportDeclaration,
};
