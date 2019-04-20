import { $ } from '../../../structures/rule';

import Declaration from './Declaration';

import { FunctionDeclaration, FunctionDeclarationMatcher } from './FunctionDeclaration';
import { VariableDeclaration, VariableDeclarationMatcher } from './VariableDeclaration';
import { ClassDeclaration, ClassDeclarationMatcher } from './ClassDeclaration';
import { ImportDeclaration, ImportDeclarationMatcher } from './ImportDeclaration';

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

export const matchers = {
  FunctionDeclarationMatcher,
  VariableDeclarationMatcher,
  ClassDeclarationMatcher,
  ImportDeclarationMatcher,
};
