import { $ } from '../../../structures/rule';

import Declaration from './Declaration';

import FunctionDeclaration from './FunctionDeclaration';
import VariableDeclaration from './VariableDeclaration';
import ClassDeclaration from './ClassDeclaration';
import ImportDeclaration from './ImportDeclaration';

Declaration.setRule($.OR(
  FunctionDeclaration,
  VariableDeclaration,
  ClassDeclaration,
  ImportDeclaration,
));

export default {
  FunctionDeclaration,
  VariableDeclaration,
  ClassDeclaration,
  ImportDeclaration,
};
