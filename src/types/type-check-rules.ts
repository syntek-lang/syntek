import * as grammar from '../grammar';

import { Type } from './types/Type';
import { TypeChecker } from './TypeChecker';

// Declarations
import { classDecl } from './internal/declarations/classDecl';
import { functionDecl } from './internal/declarations/functionDecl';
import { importDecl } from './internal/declarations/importDecl';
import { variableDecl } from './internal/declarations/variableDecl';

// Expressions
// import { arrayExpr } from './internal/expressions/arrayExpr';
// import { assignmentExpr } from './internal/expressions/assignmentExpr';
// import { asyncExpr } from './internal/expressions/asyncExpr';
// import { binaryExpr } from './internal/expressions/binaryExpr';
// import { callExpr } from './internal/expressions/callExpr';
// import { ifExpr } from './internal/expressions/ifExpr';
// import { indexExpr } from './internal/expressions/indexExpr';
// import { instanceofExpr } from './internal/expressions/instanceofExpr';
// import { memberExpr } from './internal/expressions/memberExpr';
// import { newExpr } from './internal/expressions/newExpr';
import { unaryExpr } from './internal/expressions/unaryExpr';
import { wrappedExpr } from './internal/expressions/wrappedExpr';

// Literals
import { booleanLiteral } from './internal/literals/booleanLiteral';
import { numberLiteral } from './internal/literals/numberLiteral';
import { stringLiteral } from './internal/literals/stringLiteral';

// Statements
// import { breakStmt } from './internal/statements/breakStmt';
// import { continueStmt } from './internal/statements/continueStmt';
// import { forStmt } from './internal/statements/forStmt';
// import { returnStmt } from './internal/statements/returnStmt';
// import { whileStmt } from './internal/statements/whileStmt';
// import { yieldStmt } from './internal/statements/yieldStmt';

type TypeCheckFunction = (node: any, checker: TypeChecker) => Type;

function unimplemented(node: grammar.Node): Type {
  throw new Error(`TypeCheckFunction for node of type ${grammar.SyntacticToken[node.type]} has not been implemented`);
}

/**
 * An array containing type checkers for each node. The array is ordered the same as SyntacticToken
 */
export const typeCheckRules: TypeCheckFunction[] = [
  // Declarations
  variableDecl, // EMPTY_VARIABLE_DECL
  variableDecl, // VARIABLE_DECL
  functionDecl, // EMPTY_FUNCTION_DECL
  functionDecl, // FUNCTION_DECL
  classDecl, // CLASS_DECL
  importDecl, // FULL_IMPORT_DECL
  importDecl, // PARTIAL_IMPORT_DECL

  // Expressions
  unimplemented, // ASSIGNMENT_EXPR
  wrappedExpr, // WRAPPED_EXPR
  unaryExpr, // UNARY_EXPR
  unimplemented, // BINARY_EXPR
  unimplemented, // CALL_EXPR
  unimplemented, // INDEX_EXPR
  unimplemented, // MEMBER_EXPR
  unimplemented, // NEW_EXPR
  unimplemented, // INSTANCEOF_EXPR
  unimplemented, // ASYNC_EXPR
  unimplemented, // ARRAY_EXPR
  unimplemented, // IF_EXPR
  unimplemented, // ELSE_EXPR

  unimplemented, // IDENTIFIER
  unimplemented, // SUPER
  unimplemented, // THIS

  numberLiteral, // NUMBER_LITERAL
  stringLiteral, // STRING_LITERAL
  booleanLiteral, // BOOLEAN_LITERAL

  // Statements
  unimplemented, // FOR_STMT
  unimplemented, // WHILE_STMT
  unimplemented, // RETURN_STMT
  unimplemented, // YIELD_STMT
  unimplemented, // EXPRESSION_STMT

  unimplemented, // BREAK_STMT
  unimplemented, // CONTINUE_STMT

  // Other
  unimplemented, // NATIVE_NODE
  unimplemented, // PROGRAM
  unimplemented, // GENERIC_PARAM
  unimplemented, // VARIABLE_TYPE
  unimplemented, // PARAMETER
  unimplemented, // CONSTRUCTOR
  unimplemented, // CLASS_PROP
  unimplemented, // IMPORT_EXPOSE
];
